<?php

namespace fsm;

// Crea el descriptor del servicio para subir el manual PDF de una bitacora
// [in]   program (string): el nombre del programa al cual pertenece este 
//        servicio
// [in]   module (string): el nombre del modulo al cual pertenece este servicio
// [in]   log (string): el nombre de la bitacora a la cual pertenece este 
//        servicio
// [in]   manualDir (string): la direccion donde se almacenara el archivo del 
//        manual subido por el usuario
// [out]  return (dictionary): arreglo asociativo que contiene la descripcion
//        del servicio
function 
createUploadManualService($program, $module, $log, $manualFileDir) {
  return [
    'requirements_desc' => [
      'logged_in' => ['Director', 'Manager', 'Supervisor'],
      'has_privileges' => [
        'privilege' => 'Read',
        'program' => $program,
        'module' => $module,
        'log' => $log
      ],
      'files' => [
        'name' => 'manual_file',
        'format' => 'document'
      ]
    ],
    'callback' => function($scope, $request) use ($manualFileDir) {
      // first, get the zone name
      $zone = $scope->session->getSegment('fsm')->get('zone_name');
      $manualFileDir .= (strtolower($zone).'/');

      $baseDir = realpath(
        dirname(__FILE__)."/../../../data/documents/".
        "manuals/{$manualFileDir}"
      );

      if (!is_dir($baseDir)) {
        mkdir("../../data/documents/"."manuals/{$manualFileDir}");
      }

      // if it was, compute the full directory path where the file
      // will be stored
      $uploadDir = realpath(
        dirname(__FILE__)."/../../../data/documents/".
        "manuals/{$manualFileDir}actual_manual.pdf"
      );

      // if the file currently exists, we have to rename it for
      // backup purposes; otherwise, we simply create a new file
      // so we check for that

      if (is_file($uploadDir)) {
        // then, compute the name that will be assigned to the 
        // current manual file so that we keep a backup copy of it
        $backupFile = date('Y-m-d_H-i-s').'.pdf';

        // rename the current manual file to keep a backup copy
        $backupFile = str_replace('actual_manual.pdf', $backupFile, 
          $uploadDir);
        rename($uploadDir, $backupFile);
      } else {        
        $uploadDir = realpath(
          dirname(__FILE__)."/../../../data/documents/".
          "manuals/{$manualFileDir}"
        );

        $uploadDir .= "/actual_manual.pdf";
      }      

      // finally save the uploaded file as the current manual file
      $wasMoveSuccessful = move_uploaded_file(
        $_FILES['manual_file']['tmp_name'], 
        $uploadDir
      );

      // and check if the file was saved successfully
      if (!$wasMoveSuccessful) {
        // if it wasn't, restore the last backup copy as the 
        // current manual file
        rename($backupFile, $uploadDir);

        // and notify the user of the error
        throw new \Exception(
          'The file '.$_FILES['manual_file']['name'].
          ' could not be uploaded.',
          1
        );
      }
    }
  ];
}

// Crea el descriptor del servicio para desplegar la interfaz de entrada de la 
// bitacora
// [in]   program (string): el nombre del programa al cual pertenece este 
//        servicio
// [in]   module (string): el nombre del modulo al cual pertenece este servicio
// [in]   log (string): el nombre de la bitacora a la cual pertenece este 
//        servicio
// [in]   strategy (function(dictionary, dictionary):dictionary or dictionary): 
//        la funcion a invocar al ejecutar cuando se solicita el servicio, o par
//        que define el proceso a seguir para obtener los objetos del inventario
//        de esta bitacora junto con el nombre de dichos objetos
// [in]   [useCustom] (boolean): bandera que indica si vamos a usar una funcion
//        personalizada para ejecutar el servicio o si vamos a crear una 
//        utilizando el templete
// [out]  return (dictionary): arreglo asociativo que contiene la descripcion
//        del servicio
function createLogService($program, $module, $log, $strategy, 
  $useCustom = FALSE) {
  return [
    'requirements_desc' => [
      'logged_in' => ['Manager', 'Supervisor', 'Employee'],
      'has_privileges' => [
        'privilege' => ['Read', 'Write'],
        'program' => $program,
        'module' => $module,
        'log' => $log
      ]
    ],
    'callback' => (!$useCustom) ?
      function($scope, $request) use ($strategy, $program, $module, $log) {
        // first, get the session segment
        $segment = $scope->session->getSegment('fsm');

        // retrieve the list of log items from the database
        $items = $strategy['function']($scope, $segment);

        // retrieve the footers for the capture form
        $footers = $scope->daoFactory->get('ReportFooters')
          ->getByZoneIDAndLogID(
            $segment->get('zone_id'),
            $scope->daoFactory->get('Logs')->getIDByNames(
              $program, $module, $log
            )
          );

        // prepare the response JSON
        return [
          'zone_name' => $segment->get('zone_name'),
          'program_name' => $program,
          'module_name' => $module,
          'log_name' => $log,
          'html_footer' => $footers['form_footer'],
          $strategy['items_name'] => $items
        ];
      } : $strategy
  ];
}

// Crea el descriptor del servicio para desplegar la interfaz de entrada de la 
// bitacora
// [in]   program (string): el nombre del programa al cual pertenece este 
//        servicio
// [in]   module (string): el nombre del modulo al cual pertenece este servicio
// [in]   log (string): el nombre de la bitacora a la cual pertenece este 
//        servicio
// [in]   requirements (dictionary): arreglo asociativo que describe los datos a
//        ser recibidos por el cliente para su captura en la base de datos
// [in]   strategy (function(dictionary, dictionary):dictionary or dictionary): 
//        la funcion a invocar al ejecutar cuando se solicita el servicio, o par
//        que define el proceso a seguir para obtener los objetos del inventario
//        de esta bitacora junto con el nombre de dichos objetos
// [in]   [useCustom] (boolean): bandera que indica si vamos a usar una funcion
//        personalizada para ejecutar el servicio o si vamos a crear una 
//        utilizando el templete
// [out]  return (dictionary): arreglo asociativo que contiene la descripcion
//        del servicio
function createCaptureService($program, $module, $log, 
  $requirements, $strategy, $useCustom = FALSE, $partialCapturing = FALSE) {
  return [
    'requirements_desc' => [
      'logged_in' => ['Employee'],
      'has_privileges' => [
        'privilege' => 'Write',
        'program' => $program,
        'module' => $module,
        'log' => $log
      ],
      'date' => [
        'type' => 'datetime',
        'format' => 'Y-m-d'
      ]
    ] + $requirements,
    'callback' => (!$useCustom) ?
      function($scope, $request) use ($program, $module, $log, $strategy, $partialCapturing) {
        // get the session segment
        $segment = $scope->session->getSegment('fsm');

        // get the ID of the log that we are working with
        $logID = $scope->daoFactory->get('Logs')->getIDByNames(
          $program, $module, $log
        );

        // insert the capture date and the ID of the reportee user
        $logID = $scope->daoFactory->get('CapturedLogs')->insert([
          'status_id' => ($partialCapturing) ? 4 : 1,
          'employee_id' => $segment->get('user_id'),
          'log_id' => $logID,
          'capture_date' => $request['date'],
          'extra_info1' => 
            (isset($strategy['extra_info'][0])) ?
              $request[$strategy['extra_info'][0]]
              : NULL,
          'extra_info2' => 
            (isset($strategy['extra_info'][1])) ?
              $request[$strategy['extra_info'][1]]
              : NULL
        ]);

        // using the ID of the capture date, collect the data to be 
        // stored in the data base and store it 
        return $strategy['function']($scope, $segment, $request, $logID);
      } : $strategy
  ];
}

// Crea el descriptor del servicio para generar reportes de la bitacora
// [in]   program (string): el nombre del programa al cual pertenece este 
//        servicio
// [in]   module (string): el nombre del modulo al cual pertenece este servicio
// [in]   log (string): el nombre de la bitacora a la cual pertenece este 
//        servicio
// [in]   strategy (function(dictionary, dictionary):dictionary or dictionary): 
//        la funcion a invocar al ejecutar cuando se solicita el servicio, o par
//        que define el proceso a seguir para obtener los objetos del inventario
//        de esta bitacora junto con el nombre de dichos objetos
// [in]   [useCustom] (boolean): bandera que indica si vamos a usar una funcion
//        personalizada para ejecutar el servicio o si vamos a crear una 
//        utilizando el templete
// [out]  return (dictionary): arreglo asociativo que contiene la descripcion
//        del servicio
function createReportService($program, $module, $log, $strategy,
  $useCustom = FALSE) {
  return [
    'requirements_desc' => [
      'logged_in' => ['Director', 'Manager', 'Supervisor', 'Employee'],
      'has_privileges' => [
        'privilege' => ['Read', 'Write'],
        'program' => $program,
        'module' => $module,
        'log' => $log
      ],
      'start_date' => [
        'type' => 'datetime',
        'format' => 'Y-m-d'
      ],
      'end_date' => [
        'type' => 'datetime',
        'format' => 'Y-m-d'
      ]
    ],
    'callback' => (!$useCustom) ?
      function($scope, $request) use ($program, $module, $log, $strategy) {
        // first, we get the session segment
        $segment = $scope->session->getSegment('fsm');

        // get the log ID
        $logID = $scope->daoFactory->get('Logs')->getIDByNames(
          $program, $module, $log);

        // get the footers
        $footers = $scope->daoFactory->get('ReportFooters')
          ->getByZoneIDAndLogID(
            $segment->get('zone_id'),
            $logID
          );

        // then, we get the captured logs' date info 
        $logDates = $scope->daoFactory->get('CapturedLogs')
          ->selectByDateIntervalLogIDAndZoneID(
            $request['start_date'],
            $request['end_date'],
            $logID,
            $segment->get('zone_id')
          );

        // if no logs where captured, throw an exception
        if (!isset($logDates)) {
          throw new \Exception(
            'No logs where captured at that date.', 2);
        }

        // initialize the storage for the reports
        $reports = [];

        // visit each date log that was obtained earlier
        foreach ($logDates as $logDate) {
          // retrieve the per characteristic log corresponding to 
          // this date
          $items = $strategy['function']($scope, $segment, 
            $logDate);

          // then retrieve the name of the employee and supervisor
          // that worked on this log
          $users = $scope->daoFactory->get('Users');
          $supervisor = $users->getNameByID(
            $logDate['supervisor_id']);
          $employee = $users->getNameByID(
            $logDate['employee_id']);
          
          // push the report data to the array
          $reportInfo = [
            'report_id' => $logDate['id'],
            'created_by' => 
              $employee['first_name'].' '.
              $employee['last_name'],
            'approved_by' => 
              (isset($supervisor['first_name'])) ?
                $supervisor['first_name'].' '.
                $supervisor['last_name'] 
                : 'N/A',
            'signature_path' => (strlen($supervisor['signature_path']) > 0) ? 
              $supervisor['signature_path'] : 'default.png',
            'creation_date' => $logDate['capture_date'],
            'approval_date' => 
              (isset($logDate['approval_date'])) ?
                $logDate['approval_date'] : 'N/A',
            'zone_name' => $segment->get('zone_name'),
            'program_name' => $program,
            'module_name' => $module,
            'log_name' => $log
          ];

          // check if the extra fields are being used and if they
          // are, add them to the final report info structure
          if (isset($strategy['extra_info'][0])) {
            $reportInfo[$strategy['extra_info'][0]] = 
              $logDate['extra_info1'];
          }

          if (isset($strategy['extra_info'][1])) {
            $reportInfo[$strategy['extra_info'][1]] = 
              $logDate['extra_info2'];
          }

          // add the actual log items to the report info structure
          $reportInfo[$strategy['items_name']] = $items;

          // and push the report to the final report list
          array_push($reports, $reportInfo); 
        }

        // finally return the list of reports
        return [
          'pdf_footer' => $footers['report_footer'],
          'reports' => $reports
        ];
      } : $strategy
  ];
}

// Crea el descriptor del servicio para obtener el inventario de la bitacora
// [in]   program (string): el nombre del programa al cual pertenece este 
//        servicio
// [in]   module (string): el nombre del modulo al cual pertenece este servicio
// [in]   log (string): el nombre de la bitacora a la cual pertenece este 
//        servicio
// [in]   requirements (dictionary): arreglo asociativo que describe los datos a
//        ser recibidos por el cliente para su captura en la base de datos
// [in]   callback (function(dictionary, dictionary): int): la funcion a invocar
//        al ejecutar el servicio
// [out]  return (dictionary): arreglo asociativo que contiene la descripcion
//        del servicio
function createInventoryService($program, $module, $log, $requirements, 
  $callback) {
  return [
    'requirements_desc' => [
      'logged_in' => ['Supervisor'],
      'has_privileges' => [
        'privilege' => 'Read',
        'program' => $program,
        'module' => $module,
        'log' => $log
      ] + $requirements
    ],
    'callback' => $callback
  ];
}

// Crea el descriptor del servicio para agregar un nuevo objeto al inventario de
// la bitacora
// [in]   program (string): el nombre del programa al cual pertenece este 
//        servicio
// [in]   module (string): el nombre del modulo al cual pertenece este servicio
// [in]   log (string): el nombre de la bitacora a la cual pertenece este 
//        servicio
// [in]   requirements (dictionary): arreglo asociativo que describe los datos a
//        ser recibidos por el cliente para su captura en la base de datos
// [in]   callback (function(dictionary, dictionary): int): la funcion a invocar
//        al ejecutar el servicio
// [out]  return (dictionary): arreglo asociativo que contiene la descripcion
//        del servicio
function createAddService($program, $module, $log, $requirements, $callback) {
  return [
    'requirements_desc' => [
      'logged_in' => ['Supervisor'],
      'has_privileges' => [
        'privilege' => 'Read',
        'program' => $program,
        'module' => $module,
        'log' => $log
      ]
    ] + $requirements,
    'callback' => $callback
  ];
}

// Crea el descriptor del servicio para modificar la activacion de un objeto en
// el inventario de la bitacora
// [in]   program (string): el nombre del programa al cual pertenece este 
//        servicio
// [in]   module (string): el nombre del modulo al cual pertenece este servicio
// [in]   log (string): el nombre de la bitacora a la cual pertenece este 
//        servicio
// [in]   daoName (string): el nombre del DAO a utilizar para realizar
//        la modificacion requerida en la base de datos
// [out]  return (dictionary): arreglo asociativo que contiene la descripcion
//        del servicio
function createToggleService($program, $module, $log, $daoName) {
  return [
    'requirements_desc' => [
      'logged_in' => ['Supervisor'],
      'has_privileges' => [
        'privilege' => 'Read',
        'program' => $program,
        'module' => $module,
        'log' => $log
      ],
      'id' => [
        'type' => 'int',
        'min' => 1
      ]
    ],
    'callback' => function($scope, $request) use ($daoName) {
      return $scope->daoFactory->get($daoName)->toggleActivationByID(
        $request['id']);
    }
  ];
}

// Crea el descriptor del servicio para cambiar el orden de uno de los objetos
// del inventario de la bitacora
// [in]   program (string): el nombre del programa al cual pertenece este 
//        servicio
// [in]   module (string): el nombre del modulo al cual pertenece este servicio
// [in]   log (string): el nombre de la bitacora a la cual pertenece este 
//        servicio
// [in]   daoName (string): el nombre del DAO a utilizar para realizar
//        la modificacion requerida en la base de datos
// [out]  return (dictionary): arreglo asociativo que contiene la descripcion
//        del servicio
function createReorderService($program, $module, $log, $daoName) {
  return [
    'requirements_desc' => [
      'logged_in' => ['Supervisor'],
      'has_privileges' => [
        'privilege' => 'Read',
        'program' => $program,
        'module' => $module,
        'log' => $log
      ],
      'items' => [
        'type' => 'array',
        'values' => [
          'id' => [
            'type' => 'int',
            'min' => 1
          ],
          'position' => [
            'type' => 'int'
          ]
        ]
      ]
    ],
    'callback' => function($scope, $request) use ($daoName) {
      // obtenemos el valor de la maxima posicion que esta permitida
      $max = count($request['items']); 

      // arreglo temporal donde almacenaremos los valores de posicion repetidos
      $positions = [];

      // visitamos cada elemento a actualizar
      foreach ($request['items'] as $item) {
        // revisamos que su valor de posicion este dentro del intervalo esperado
        if ($item['position'] < 1 || $item['position'] > $max) {
          throw new \Exception(
            "Invalid position value for item with ID: {$item['item_id']}", 
            1
          );
        }

        // revisamos que el valor de la posicion no este repetida
        if (!in_array($item['position'], $positions)) {
          array_push($positions, $item['position']);
        } else {
          throw new \Exception(
            "Repeated position value for item with ID: {$item['item_id']}",
            2
          );
        }
      }

      // obtenemos el DAO de la tabla que va a ser actualizada
      $dao = $scope->daoFactory->get($daoName);

      // actualizamos cada elemento en la tabla
      foreach ($request['items'] as $item) {
        $dao->updatePositionByID($item['id'], $item['position']);
      }
    }
  ];
}

// Crea el descriptor del servicio para modificar los datos de una bitacora
// [in]   program (string): el nombre del programa al cual pertenece este 
//        servicio
// [in]   module (string): el nombre del modulo al cual pertenece este servicio
// [in]   log (string): el nombre de la bitacora a la cual pertenece este 
//        servicio
// [in]   requirements (dictionary): arreglo asociativo que describe los datos a
//        ser recibidos por el cliente para su captura en la base de datos
// [in]   strategy (function(dictionary, dictionary):dictionary or dictionary): 
//        la funcion a invocar al ejecutar cuando se solicita el servicio, o par
//        que define el proceso a seguir para obtener los objetos del inventario
//        de esta bitacora junto con el nombre de dichos objetos
// [in]   [useCustom] (boolean): bandera que indica si vamos a usar una funcion
//        personalizada para ejecutar el servicio o si vamos a crear una 
//        utilizando el templete
// [out]  return (dictionary): arreglo asociativo que contiene la descripcion
//        del servicio
function createUpdateService($program, $module, $log, $requirements, $strategy,
  $useCustom = FALSE) {
  return [
    'requirements_desc' => [
      'logged_in' => ['Supervisor', 'Employee'],
      'has_privileges' => [
        'privilege' => ['Read', 'Write'],
        'program' => $program,
        'module' => $module,
        'log' => $log
      ],
      'report_id' => [
        'type' => 'int',
        'min' => 1
      ],
      'date' => [
        'type' => 'datetime',
        'format' => 'Y-m-d'
      ]
    ] + $requirements,
    'callback' => (!$useCustom) ? 
      function($scope, $request) use ($strategy) {
        $roleName = $scope->session->getSegment('fsm')->get('role_name');
        $statusName = $scope->daoFactory->
          get('CapturedLogs')->getStatusName($request['report_id']);
        
        if ($statusName == 'Approved') {
          throw new \Exception(
            'Requested report cannot be edited; it was already approved', 
            9
          );
        }

        if (($statusName == 'Capturing' && $roleName == 'Employee') || ($statusName == 'Waiting' && $roleName == 'Supervisor')) {
          // update the extra info of the log if there is any
          if (isset($strategy['extra_info'][0])) {
            $data['extra_info1'] = $request[$strategy['extra_info'][0]];
          }

          if (isset($strategy['extra_info'][1])) {
            $data['extra_info2'] = $request[$strategy['extra_info'][1]];
          }

          // update the capture_date
          $data['capture_date'] = $request['date'];

          $scope->daoFactory->get('CapturedLogs')->updateByID(
            $data, $request['report_id']
          );

          // then update the other tables
          return $strategy['function']($scope, $request);
        } else {
          if ($roleName == 'Employee') {
            throw new \Exception(
              'Requested report cannot be edited; it is already being reviewed by a Supervisor',
              10
            );
          } else if ($roleName == 'Supervisor') {
            throw new \Exception(
              'Requested report cannot be edited; it is still being captured by an Employee', 
              11
            );
          } else {
            throw new \Exception(
              'Requested report cannot be edited; user does not have the proper role',
              12
            );
          }
        }
      }
      : $strategy
  ];
}

// Crea el descriptor del servicio para generar un reporte para su autorizacion
// [in]   program (string): el nombre del programa al cual pertenece este 
//        servicio
// [in]   module (string): el nombre del modulo al cual pertenece este servicio
// [in]   log (string): el nombre de la bitacora a la cual pertenece este 
//        servicio
// [in]   strategy (function(dictionary, dictionary):dictionary or dictionary): 
//        la funcion a invocar al ejecutar cuando se solicita el servicio, o par
//        que define el proceso a seguir para obtener los objetos del inventario
//        de esta bitacora junto con el nombre de dichos objetos
// [in]   [useCustom] (boolean): bandera que indica si vamos a usar una funcion
//        personalizada para ejecutar el servicio o si vamos a crear una 
//        utilizando el templete
// [out]  return (dictionary): arreglo asociativo que contiene la descripcion
//        del servicio
function createAuthorizationReportService($program, $module, $log, $strategy,
  $useCustom = FALSE) {
  return [
    'requirements_desc' => [
      'logged_in' => ['Supervisor', 'Employee'],
      'has_privileges' => [
        'privilege' => ['Read', 'Write'],
        'program' => $program,
        'module' => $module,
        'log' => $log
      ],
      'report_id' => [
        'type' => 'int',
        'min' => 0
      ]
    ],
    'callback' => (!$useCustom) ?
      function($scope, $request) use ($program, $module, $log, $strategy) {
        // first, we get the session segment
        $segment = $scope->session->getSegment('fsm');

        // then, we get the captured logs' date info 
        $logDate = $scope->daoFactory->get('CapturedLogs')
          ->selectByIDLogIDAndZoneID(
            $request['report_id'],
            $scope->daoFactory->get('Logs')->getIDByNames(
              $program, $module, $log),
            $segment->get('zone_id')
          );

        // if no logs where captured, throw an exception
        if (!isset($logDate)) {
          throw new \Exception(
            'No logs where captured at that date.', 2);
        }

        // retrieve the per characteristic log corresponding to 
        // this date
        $items = $strategy['function']($scope, $segment, 
          $logDate);

        // then retrieve the name of the employee and supervisor
        // that worked on this log
        $users = $scope->daoFactory->get('Users');
        $supervisor = $users->getNameByID(
          $logDate['supervisor_id']);
        $employee = $users->getNameByID(
          $logDate['employee_id']);
          
        // push the report data to the array
        $reportInfo = [
          'report_id' => $logDate['id'],
          'created_by' => 
            $employee['first_name'].' '.
            $employee['last_name'],
          'approved_by' => 
            (isset($supervisor['first_name'])) ?
              $supervisor['first_name'].' '.
              $supervisor['last_name'] 
              : 'N/A',
          'creation_date' => $logDate['capture_date'],
          'approval_date' => 
            (isset($logDate['approval_date'])) ?
              $logDate['approval_date'] : 'N/A',
          'zone_name' => $segment->get('zone_name'),
          'program_name' => $program,
          'module_name' => $module,
          'log_name' => $log
        ];

        // check if the extra fields are being used and if they
        // are, add them to the final report info structure
        if (isset($strategy['extra_info'][0])) {
          $reportInfo[$strategy['extra_info'][0]] = 
            $logDate['extra_info1'];
        }

        if (isset($strategy['extra_info'][1])) {
          $reportInfo[$strategy['extra_info'][1]] = 
            $logDate['extra_info2'];
        }

        // add the actual log items to the report info structure
        $reportInfo[$strategy['items_name']] = $items;

        // finally return the list of reports
        return $reportInfo;
      } : $strategy
  ];
}

function createLogListService($program, $module, $log, $sameUserOnly = FALSE) {
  return [
    'requirements_desc' => [
      'logged_in' => ['Employee'],
      'has_privileges' => [
        'privilege' => ['Read', 'Write'],
        'program' => $program,
        'module' => $module,
        'log' => $log
      ]
    ],
    'callback' => function($scope, $request) use ($program, $module, $log, $sameUserOnly) {
      $segment = $scope->session->getSegment('fsm');
      $userID = $segment->get('user_id');
      $zoneID = $scope->daoFactory->get('Users')->getZoneIDByID($userID);
      $logID = $scope->daoFactory->get('Logs')->getIDByNames($program, $module, $log);

      if ($sameUserOnly) {
        $logList = $scope->daoFactory->get('CapturedLogs')->selectCapturingLogsByLogIDAndZoneIDAndUserID($logID, $zoneID, $userID);
      } else {
        $logList = $scope->daoFactory->get('CapturedLogs')->selectCapturingLogsByLogIDAndZoneID($logID, $zoneID);
      }

      return $logList;
    }
  ];
}

?>
<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = [
  'requirements_desc' => [
    'logged_in' => ['Director', 'Manager', 'Supervisor', 'Employee'],
    'has_privileges' => [
      'privilege' => ['Read', 'Write'],
      'program' => 'GMP',
      'module' => 'Document Control',
      'log' => 'Document Control'
    ],
    'start_date' => [
      'type' => 'datetime',
      'format' => 'Y-m-d'
    ],
    'end_date' => [
      'type' => 'datetime',
      'format' => 'Y-m-d'
    ],
    'document_id' => [
      'type' => 'int',
      'min' => 1,
      'optional' => TRUE
    ]
  ],
  'callback' => function($scope, $request) {
    // first, we get the session segment
    $segment = $scope->session->getSegment('fsm');

    // get the log ID
    $logID = $scope->daoFactory->get('Logs')->getIDByNames(
      'GMP', 'Document Control', 'Document Control');

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
      // primero obtenemos todos los registros capturados en la fecha solicitada
      $wasDocumentIDProvided = isset($request['document_id']) 
        && array_key_exists('document_id', $request);

      $rows = ($wasDocumentIDProvided) ? 
        $scope->daoFactory->get('gmp\docControl\docControl\Logs')
          ->selectByCaptureDateID($logDate['id'])
        : $scope->daoFactory->get('gmp\docControl\docControl\Logs')
          ->selectByCaptureDateIDAndDocumentID(
            $logDate['id'], 
            $request['document_id']
          );

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
        'program_name' => "GMP",
        'module_name' => "Document Control",
        'log_name' => "Document Control"
      ];

      // inicializamos el arreglo donde seran devueltos todos los registros
      $document = [
        'id' => 0
      ];
      
      // visitamos cada registro leido de la BD
      foreach ($rows as $row) {
        // revisamos si el documento del registro cambio
        $hasDocumentChanged = $row['document_id'] != $document['id'];
        if ($hasDocumentChanged) {
          // si cambio, revisamos si es el primer registro leido
          if ($document['id'] != 0) {
            array_push($reports, $reportInfo + [
              'display_date' => 
                "{$reportInfo['creation_date']} {$document['name']}",
              'document' => $document
            ]);
          }

          // e reiniciamos el almacenamiento temporal con la informacion
          // del documento actual
          $document = [
            'id' => $row['document_id'],
            'name' => $row['document_name'],
            'entries' => []
          ];

          // guardamos la informacion del documento actual en el almacenamiento
          // temporal
          array_push($document['entries'], [
            'employee' => $row['document_employee'],
            'date' => $row['document_date'],
            'notes' => $row['notes'],
            'additional_info_url' => $row['additional_info_url'],
            'pictures' => $row['pictures'],
            'files' => $row['files']
          ]);
        } else {
          // si el documento no ha cambiado, guardamos la informacion en el 
          // almacenamiento temporal
          array_push($document['entries'], [
            'employee' => $row['document_employee'],
            'date' => $row['document_date'],
            'notes' => $row['notes'],
            'additional_info_url' => $row['additional_info_url'],
            'pictures' => $row['pictures'],
            'files' => $row['files']
          ]);
        } // if ($hasDocumentChanged)
      } // foreach ($rows as $row)

      // no hay que olvidar almacenar el ultimo registro en el conglomerado
      if ($document['id'] != 0) {
        array_push($reports, $reportInfo + [
          'display_date' => 
            "{$reportInfo['creation_date']} {$document['name']}",
          'document' => $document
        ]);
      }
    } // foreach ($logDates as $logDate)

    // finally return the list of reports
    return [
      'pdf_footer' => $footers['report_footer'],
      'reports' => $reports
    ];
  }
];

?>
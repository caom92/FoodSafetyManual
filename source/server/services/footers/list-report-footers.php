<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'zone_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'module_id' => [
      'type' => 'int',
      'min' => 1
    ]
  ],
  'callback' => function($scope, $request) {
    // primero obtenemos una lista de todas las bitacoras del modulo 
    // seleccionado
    $logs = $scope->daoFactory->get('Logs')->selectByModuleID(
      $request['module_id']
    );

    // luego obtenemos una instancia del DAO donde se guardan los pies de pagina
    $footersTable = $scope->daoFactory->get('ReportFooters'); 

    // y lo usamos para obtener una lista de los pies de pagina de las 
    // bitacoras de este modulo
    $footers = 
      $footersTable->selectByZoneIDAndModuleID(
        $request['zone_id'],
        $request['module_id']
      );
    
    // si la longitud de ambas listas es diferente, quiere decir que hay 
    // bitacoras que no tienen registrado ningun pie de pagina, debemos
    // corregir esto
    if (count($logs) > count($footers)) {
      // inicializamos un arreglo temporal donde almacenaremos las bitacoras a 
      // las que le agregaremos un pie de pagina vacion
      $newFooters = [];

      // visitamos cada bitacora del modulo
      foreach ($logs as $log) {
        // inicializamos una bandera que indicara si esta bitacora tiene pie de 
        // pagina o no
        $hasFooter = FALSE;

        // ahora visitamos cada pie de pagina
        foreach ($footers as $footer) {
          // revisamos si la bitacora actual tiene un pie de pagina
          if ($footer['log_id'] == $log['id']) {
            $hasFooter = TRUE;
            break;
          }
        }

        // si la bitacora no pudo ser encontrada en la lista de pies de pagina,
        // hay que guardarla en nuestro arreglo temporal para insertarle un pie 
        // de pagina vacio
        if (!$hasFooter) {
          array_push($newFooters, [
            'zone_id' => $request['zone_id'],
            'log_id' => $log['id'],
            'capture_form_footer' => '',
            'report_document_footer' => ''
          ]);
        }

        // continuamos con la sig. bitacora
      }

      // si hay bitacoras pendientes de agregarle un pie de pagina vacio
      if (count($newFooters) > 0) {
        // se las agregamos
        $footersTable->insert($newFooters);

        // y obtenemos la nueva lista de pies de pagina
        $footers = 
          $footersTable->selectByZoneIDAndModuleID(
            $request['zone_id'],
            $request['module_id']
          );
      }
    } // if (count($logs) > count($footers))

    // retornamos la lista de pies de pagina
    return $footers;
  }
];

?>
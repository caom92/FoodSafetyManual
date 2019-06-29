<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createReportService(
  'GMP',
  'Packing',
  'Revisión General de Producto Terminado',
  [
    'items_name' => 'entries',
    'extra_info' => [
      // NULL
    ],
    'function' => function($scope, $segment, $logDate) {
      // get the list of all entries from the database
      return $scope->daoFactory->get('gmp\packing\productRevision\Logs')
        ->selectByCaptureDateID(
          $logDate['id']
        );
    }
  ]
);

?>
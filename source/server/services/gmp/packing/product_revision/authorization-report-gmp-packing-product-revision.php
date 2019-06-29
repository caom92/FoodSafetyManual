<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createAuthorizationReportService(
  'GMP',
  'Packing',
  'Revisión General de Producto Terminado',
  [
    'items_name' => 'log_info',
    'extra_info' => [
      // NULL
    ],
    'function' => function($scope, $segment, $logDate) {
      // get the list of all entries from the database
      $entries = $scope->daoFactory->get('gmp\packing\productRevision\Logs')
        ->selectByCaptureDateID(
          $logDate['id']
        );

        // and then, obtain the list of quality types
        $qualityTypes = $scope->daoFactory->get('gmp\packing\productRevision\QualityTypes')->selectAll();

        // finally, return the log info
        return [
          'quality_types' => $qualityTypes,
          'entries' => $entries
        ];
    }
  ]
);

?>
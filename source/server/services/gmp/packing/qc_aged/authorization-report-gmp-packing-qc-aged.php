<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createAuthorizationReportService(
  'GMP',
  'Packing',
  'QC Aged Product',
  [
    'items_name' => 'items',
    'extra_info' => [
      // NULL
    ],
    'function' => function($scope, $segment, $logDate) {
      // get the list of all entries from the database
      $entries = $scope->daoFactory->get('gmp\packing\agedProduct\Logs')
        ->selectByCaptureDateID(
          $logDate['id']
        );

        // finally, return the log info
        return [
          'quality_types' => $qualityTypes,
          'entries' => $entries
        ];
    }
  ]
);

?>
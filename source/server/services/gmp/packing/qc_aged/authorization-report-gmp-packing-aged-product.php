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
      // and then, obtain the list of quality types
      $qualityTypes = $scope->daoFactory->get('QualityTypes')->selectAll();

      // then obtain the list of actions
      $actions = $scope->daoFactory->get('gmp\packing\agedProduct\Actions')
        ->selectAll();
      
      // get the list of all entries from the database
      $entries = $scope->daoFactory->get('gmp\packing\agedProduct\Logs')
        ->selectByCaptureDateID(
          $logDate['id']
        );

      // finally, return the log info
      return [
        'quality_types' => $qualityTypes,
        'actions' => $actions,
        'entries' => $entries
      ];
    }
  ]
);

?>
<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createReportService(
  'GMP',
  'Packing',
  'Daily Finished Product Check',
  [
    'items_name' => 'entries',
    'extra_info' => [
      // NULL
    ],
    'function' => function($scope, $segment, $logDate) {
      // get the list of all entries from the database
      return $scope->daoFactory->get('gmp\packing\finishedProduct\Logs')
        ->selectByCaptureDateID(
          $logDate['id']
        );
    }
  ]
);

?>
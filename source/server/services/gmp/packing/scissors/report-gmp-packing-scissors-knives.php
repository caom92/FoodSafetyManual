<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = fsm\createReportService(
  'GMP',
  'Packing',
  'Daily Scissors & Knives Inspection',
  [
    'items_name' => 'items',
    'extra_info' => [
      'notes',
    ],
    'function' => function($scope, $segment, $logDate) {
      // retrieve the per group log corresponding to this date
      return $scope->daoFactory->get('gmp\packing\scissors\Logs')
        ->selectByCaptureDateID($logDate['id']);
    }
  ]
);

?>
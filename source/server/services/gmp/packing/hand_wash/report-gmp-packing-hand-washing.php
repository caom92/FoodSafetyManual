<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = fsm\createReportService(
  'GMP',
  'Packing',
  'Daily Hand Washing Inspection',
  [
    'items_name' => 'items',
    'extra_info' => [
      'notes',
    ],
    'function' => function($scope, $segment, $logDate) {
      // retrieve the per characteristic log corresponding to this date
      $items = $scope->daoFactory->get('gmp\packing\handWash\Logs')
        ->selectByCaptureDateID($logDate['id']);
      return $items;
    }
  ]
);

?>
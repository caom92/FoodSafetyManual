<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createReportService(
  'GAP',
  'Fields',
  'Harvest Machine Cleaning',
  [
    'items_name' => 'machines',
    'extra_info' => [
      // NULL
    ],
    'function' => function($scope, $segment, $logDate) {
      $logs = $scope->daoFactory->get('gap\packing\harvestMachineCleaning\Logs');

      $machines = $logs->selectByCaptureDateID($logDate['id']);

      return $machines;
    }
  ]
);

?>
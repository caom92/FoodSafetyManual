<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createReportService(
  'GMP',
  'Packing',
  'Harvest Tool Accountability Program And Sanitizing Log',
  [
    'items_name' => 'days',
    'extra_info' => [
      // NULL
    ],
    'function' => function($scope, $segment, $logDate) {
      $days = $scope->daoFactory->get('gmp\packing\harvestTool\DateLogs')
        ->selectByCaptureDateID($logDate['id']);

      foreach ($days as &$day) {
        $day['tools'] = $scope->daoFactory->get('gmp\packing\harvestTool\ToolLogs')
          ->selectByDateLogID($day['id']);
      }

      return $days;
    }
  ]
);

?>
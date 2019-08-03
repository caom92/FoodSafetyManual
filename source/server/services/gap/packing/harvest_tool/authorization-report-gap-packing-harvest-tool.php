<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createAuthorizationReportService(
  'GAP',
  'Fields',
  'Harvest Tool Accountability Program And Sanitizing Log',
  [
    'items_name' => 'days',
    'extra_info' => [
      // NULL
    ],
    'function' => function($scope, $segment, $logDate) {
      $days = $scope->daoFactory->get('gap\packing\harvestTool\DateLogs')
        ->selectByCaptureDateID($logDate['id']);

      foreach ($days as &$day) {
        $day['tools'] = $scope->daoFactory->get('gap\packing\harvestTool\ToolLogs')
          ->selectByDateLogID($day['id']);
      }

      return $days;
    }
  ]
);

?>
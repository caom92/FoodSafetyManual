<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createAuthorizationReportService(
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
        $day['types'] = $scope->daoFactory->get('gmp\packing\harvestTool\TypeLogs')
          ->selectByDateLogID($day['id']);
      }

      return $days;
    }
  ]
);

?>
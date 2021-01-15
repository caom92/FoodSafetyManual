<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createReportService(
  'GMP',
  'Packing',
  'Bathroom Cleaning Record',
  [
    'items_name' => 'days',
    'extra_info' => [
      // NULL
    ],
    'function' => function($scope, $segment, $logDate) {
      $days = $scope->daoFactory->get('gmp\packing\bathroomCleaning\DateLogs')
        ->selectByCaptureDateID($logDate['id']);

      foreach ($days as &$day) {
        $day['items'] = $scope->daoFactory->get('gmp\packing\bathroomCleaning\ItemLogs')
          ->selectByDateLogID($day['id']);
      }

      return $days;
    }
  ]
);

?>
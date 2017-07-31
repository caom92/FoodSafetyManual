<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createAuthorizationReportService(
  'GAP',
  'Others',
  'Daily Notice of Unusual Occurrence and Corrective Action Report',
  [
    'items_name' => 'items',
    'extra_info' => [
      // NULL
    ],
    'function' => function($scope, $segment, $logDate) {
      $entry = $scope->daoFactory->get('gap\others\unusualOccurrence\Logs')
        ->selectByCaptureDateID($logDate['id']);
      $shifts = $scope->daoFactory->get('Shifts')->selectAll();

      return [
        'shifts' => $shifts,
        'entry' => $entry[0]
      ];
    }
  ]
);

?>
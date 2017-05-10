<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = fsm\createReportService(
  'GMP',
  'Packing',
  'Daily Notice of Unusual Occurrence and Corrective Action Report',
  [
    'items_name' => 'entry',
    'extra_info' => [
      // NULL
    ],
    'function' => function($scope, $segment, $logDate) {
      return $scope->daoFactory->get('gmp\packing\unusualOccurrence\Logs')
        ->selectByCaptureDateID($logDate['id']);
    }
  ]
);

?>
<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = fsm\createReportService(
  'GMP',
  'Packing',
  'Daily Thermometer Calibration Verification Check',
  [
    'items_name' => 'items',
    'extra_info' => [
      'time',
    ],
    'function' => function($scope, $segment, $logDate) {
      // retrieve the per group log corresponding to this date
      return $scope->daoFactory->get('gmp\packing\thermometers\Logs')
        ->selectByCaptureDateID($logDate['id']);
    }
  ]
);

?>
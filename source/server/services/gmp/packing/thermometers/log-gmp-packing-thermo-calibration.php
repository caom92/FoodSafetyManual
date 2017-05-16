<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = fsm\createLogService(
  'GMP',
  'Packing',
  'Daily Thermometer Calibration Verification Check',
  [
    'items_name' => 'items',
    'function' => function($scope, $segment) {
      // retrieve the list of thermometers from the database
      return $scope->daoFactory->get('gmp\packing\thermometers\Thermometers')
        ->selectActiveByZoneID($segment->get('zone_id'));
    }
  ]
);

?>
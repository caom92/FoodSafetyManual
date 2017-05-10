<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = fsm\createAddService(
  'GMP',
  'Packing',
  'Daily Thermometer Calibration Verification Check',
  [
    'name' => [
      'type' => 'string'
    ]
  ],
  function($scope, $request) {
    // first we get the session segment
    $segment = $scope->session->getSegment('fsm');

    // store the item in the data base 
    return $scope->daoFactory->get('gmp\packing\thermometers\Thermometers')
      ->insert([
        'zone_id' => $segment->get('zone_id'),
        'is_active' => TRUE,
        'serial_num' => $request['name']
      ]);
  }
);

?>
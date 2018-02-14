<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


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
    // first we get the zone ID
    $zoneID = $scope->session->getSegment('fsm')->get('zone_id');

    // count the number of items in this area so we can compute the position
    // of this item and add it in the last position
    $thermometers = $scope->daoFactory
      ->get('gmp\packing\thermometers\Thermometers');
    $numItems = $thermometers->countByZoneID($zoneID);

    // store the item in the data base 
    return $thermometers->insert([
      'zone_id' => $zoneID,
      'is_active' => TRUE,
      'position' => $numItems + 1,
      'serial_num' => $request['name']
    ]);
  }
);

?>
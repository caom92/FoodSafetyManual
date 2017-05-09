<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = fsm\createAddService(
  'GMP',
  'Packing',
  'Daily Scale Calibration Check',
  [
    'zone_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'type_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'scale_name' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 32
    ]
  ],
  function($scope, $request) {
    // first we get the session segment
    $segment = $scope->session->getSegment('fsm');
    $zoneID = $segment->get('zone_id');

    // count the number of scales in this zone
    // so we can compute the position of this scale and add it
    // in the last position
    $scales = $scope->daoFactory->get('gmp\packing\calibration\Scales');
    $numScalesInZone = $scales->countByZoneAndTypeIDs(
      $zoneID,
      $request['type_id']
    );

    // store the item in the data base 
    return $scales->insert([
      'is_active' => TRUE,
      'zone_id' => $zoneID,
      'type_id' => $request['type_id'],
      'position' => $numScalesInZone + 1,
      'serial_num' => $request['scale_name']
    ]);
  }
);

?>
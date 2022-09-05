<?php

require_once realpath(dirname(__FILE__).'/../../service_creators.php');

$service = fsm\createEditRegisterService(
  'ozone-water',
  [
    'time' => [
      'type' => 'datetime',
      'format' => 'G:i',
      'optional' => true
    ],
    'initials' => [
      'type' => 'string',
      'max_length' => 255,
      'optional' => true
    ],
    'area' => [
      'type' => 'string',
      'max_length' => 65535,
      'optional' => true
    ]
  ],
  function($scope, $request, $capturedRegisterID) {
    $segment = $scope->session->getSegment('fsm');
    $ozoneWaterLogs = $scope->daoFactory->get('ozoneWater\Logs');
    $zoneID = $segment->get('zone_id');

    $ozoneWaterLogs->updateByCapturedRegisterID([
      'time' => (isset($request['time']) && array_key_exists('time', $request)) ? $request['time'] : NULL,
      'initials' => (isset($request['initials']) && array_key_exists('initials', $request)) ? $request['initials'] : NULL,
      'area' => (isset($request['area']) && array_key_exists('area', $request)) ? $request['area'] : NULL
    ], $capturedRegisterID);

    return $ozoneWaterLogs->selectByCapturedRegisterID($capturedRegisterID);
  }
);
  
?>
<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createAddService(
  'GMP',
  'Packing',
  'Ozone Water Test Log',
  [
    'name' => [
      'type' => 'string',
      'max_length' => 255
    ]
  ],
  function($scope, $request) {
    $zoneID = $scope->session->getSegment('fsm')->get('zone_id');
    $machines = $scope->daoFactory->get('gmp\packing\ozone\Machines');
    $numItems = $machines->countByZoneID($zoneID);
    return $machines->insert([
      'zone_id' => $zoneID,
      'is_active' => TRUE,
      'position' => $numItems + 1,
      'name' => $request['name']
    ]);
  }
);

?>
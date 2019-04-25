<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createAddService(
  'GMP',
  'Packing',
  'ATP SystemSURE Luminometer',
  [
     'name' => [
        'type' => 'string'
      ]
  ],
  function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $zoneID = $segment->get('zone_id');

    $items = $scope->daoFactory->get('gmp\packing\atpLuminometer\Items');
    $numItems = $items->countByZoneID($zoneID);

    return $scope->daoFactory->get('gmp\packing\atpLuminometer\Items')
      ->insert([
        'zone_id' => $segment->get('zone_id'),
        'is_active' => TRUE,
        'position' => $numItems + 1,
        'name' => $request['name']
      ]);
  }
);

?>
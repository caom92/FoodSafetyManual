<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createAddService(
  'GMP',
  'Packing',
  'Cutting Tool Accountability Program And Sanitizing Log',
  [
    'name' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 255
    ]
  ],
  function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $zoneID = $segment->get('zone_id');
    $items = $scope->daoFactory->get('gmp\packing\harvestTool\Tools');

    $isNameDuplicated = $items->hasByNameAndZoneID(
      $request['name'],
      $zoneID
    );

    if ($isNameDuplicated) {
      throw new \Exception('Item name is already taken.', 1);
    }

    $count = $items->countByZoneID($zoneID);

    return $items->insert([
      'zone_id' => $zoneID,
      'is_active' => TRUE,
      'position' => $count + 1,
      'name' => $request['name']
    ]);
  }
);

?>
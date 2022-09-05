<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createAddService(
  'GAP',
  'Fields',
  'Pest Control Inspection Flytrap',
  [
    'name' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 65535
    ]
  ],
  function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $zoneID = $segment->get('zone_id');
    $items = $scope->daoFactory->get('gap\packing\pestControlInspectionFlytrap\ProtectionStatus');

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
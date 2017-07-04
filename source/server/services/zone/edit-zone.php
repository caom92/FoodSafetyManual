<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'zone_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'zone_name' => [
      'type' => 'string',
      'length' => 3
    ],
    'company_name' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 255
    ],
    'company_address' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 255
    ]
  ],
  'callback' => function($scope, $request) {
    $zones = $scope->daoFactory->get('Zones'); 
    $currentZone = $zone->getByID($request['zone_id']);
    $isZoneNameDuplicated = 
      $zones->hasByName($request['zone_name'])
      && $currentZone['name'] != $request['zone_name'];

    if (!$isZoneNameDuplicated) {
      $zones->updateByZoneID($request['zone_id'], [
        'name' => $request['zone_name'],
        'company_name' => $request['company_name'],
        'address' => $request['company_address']
      ]);
    } else {
      throw new \Exception(
        'Cannot change zone name; the name is already taken.');
    }
  }
];

?>
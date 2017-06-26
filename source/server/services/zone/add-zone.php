<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'new_zone' => [
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
    ],
    'logo' => [
      'type' => 'files',
      'format' => 'bitmap'
    ]
  ],
  'callback' => function($scope, $request) {
    $zones = $scope->daoFactory->get('Zones'); 
    $isZoneNameDuplicated = $zones->hasByName($request['new_zone']);

    if (!$isZoneNameDuplicated) {
      $zones->insert([
        'name' => $request['new_zone'],
        'company_name' => $request['company_name'],
        'address' => $request['company_address'],
        'logo_path' => $request
      ]);
      return [];
    } else {
      throw new \Exception('Cannot add new zone; name is already taken.');
    }
  }
];

?>
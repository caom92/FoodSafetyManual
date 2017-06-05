<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor', 'Employee'],
    'has_privileges' => [
      'privilege' => ['Read', 'Write'],
      'program' => 'GMP',
      'module' => 'Packing',
      'log' => 'Environmental ATP Testing'
    ],
    'name' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 255
    ]
  ],
  'callback' => function($scope, $request) {
    // first we get the session segment
    $segment = $scope->session->getSegment('fsm');
    $zoneID = $segment->get('zone_id');
    $areas = $scope->daoFactory->get('gmp\packing\atp\CheckAreas');

    // store the item in the data base 
    return $areas->insert([
      'zone_id' => $zoneID,
      'name' => $request['name']
    ]);
  }
];

?>
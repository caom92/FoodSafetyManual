<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor'],
    'has_privileges' => [
      'privilege' => ['Read', 'Write'],
      'program' => 'GAP',
      'module' => 'Packing',
      'log' => 'Pre-Operational Inspection'
    ],
    'area_name' => [
      'type' => 'string'
    ]
  ],
  'callback' => function($scope, $request) {
    // get session segment
    $segment = $scope->session->getSegment('fsm');

    // insert the new area
    $id = $scope->daoFactory->get('gap\packing\preop\WorkingAreas')->insert([
      'zone_id' => $segment->get('zone_id'),
      'name' => $request['area_name']
    ]);

    return [
      'id' => $id,
      'name' => $request['area_name']
    ];
  }
];

?>
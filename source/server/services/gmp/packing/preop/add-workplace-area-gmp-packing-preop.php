<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor'],
    'has_privileges' => [
      'privilege' => ['Read', 'Write'],
      'program' => 'GMP',
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

    $areas = $scope->daoFactory->get('gmp\packing\preop\WorkingAreas');
    $isAreaNameDuplicated = $areas->hasByName($request['area_name']);

    if (!$isAreaNameDuplicated) {
      // insert the new area
      $id = $areas->insert([
        'zone_id' => $segment->get('zone_id'),
        'name' => $request['area_name']
      ]);

      return [
        'id' => $id,
        'name' => $request['area_name']
      ];
    } else {
      throw new \Exception(
        'Failed to add new area; the name is already taken.'
      );
    }
  }
];

?>
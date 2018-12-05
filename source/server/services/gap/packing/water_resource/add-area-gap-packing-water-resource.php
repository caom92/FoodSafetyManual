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
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 255
    ]
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');

    $areas = $scope->daoFactory->get('gap\packing\waterResource\Areas');

    $isAreaNameDuplicated = $areas->hasByNameAndZoneID(
      $request['area_name'], $segment->get('zone_id')
    );

    if (!$isAreaNameDuplicated) {
      $numAreas = $areas->countByZoneID($segment->get('zone_id'));

      $position = $numAreas + 1;

      $id = $areas->insert([
        'zone_id' => $segment->get('zone_id'),
        'position' => $position,
        'name' => $request['area_name']
      ]);

      return [
        'id' => $id,
        'position' => $position,
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
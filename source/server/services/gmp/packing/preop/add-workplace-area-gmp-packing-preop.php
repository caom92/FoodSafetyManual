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
    // get session segment
    $segment = $scope->session->getSegment('fsm');

    $areas = $scope->daoFactory->get('gmp\packing\preop\WorkingAreas');
    $isAreaNameDuplicated = $areas->hasByNameAndZoneID(
      $request['area_name'], $segment->get('zone_id')
    );

    if (!$isAreaNameDuplicated) {
      // count the number of areas so we can compute the position of this
      // item and add it in the last position
      $numAreas = $areas->countByZoneID(
        $segment->get('zone_id')
      );

      // insert the new area
      $position = $numAreas + 1;
      $id = $areas->insert([
        'zone_id' => $segment->get('zone_id'),
        'position' => $position,
        'name' => $request['area_name']
      ]);

      return [
        'id' => $id,
        "position" => $position,
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
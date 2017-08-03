<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor'],
    'has_privileges' => [
      'privilege' => ['Read', 'Write'],
      'program' => 'GAP',
      'module' => 'Fields',
      'log' => 'Organic Program Verification & SRRC'
    ],
    'area_name' => [
      'type' => 'string'
    ]
  ],
  'callback' => function($scope, $request) {
    // get session segment
    $segment = $scope->session->getSegment('fsm');

    $areas = $scope->daoFactory->get('gap\packing\preop\WorkingAreas');
    $isAreaNameDuplicated = $areas->hasByName($request['area_name']);

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
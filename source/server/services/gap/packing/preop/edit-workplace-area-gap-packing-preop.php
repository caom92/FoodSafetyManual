<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor'],
    'has_privileges' => [
      'privilege' => ['Read', 'Write'],
      'program' => 'GAP',
      'module' => 'Fields',
      'log' => 'Pre Operativo Diario'
    ],
    'area_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'area_name' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 255
    ]
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $areas = $scope->daoFactory->get('gap\packing\preop\WorkingAreas');
    $isAreaNameDuplicated = $areas->hasByNameAndZoneID(
      $request['area_name'], $segment->get('zone_id')
    );

    if ($isAreaNameDuplicated) {
      throw new \Exception(
        'Failed to edit area name; the name is already taken.'
      );
    }

    return $areas->updateNameByID($request['area_id'], $request['area_name']);
  }
];

?>
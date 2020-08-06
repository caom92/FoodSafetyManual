<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor'],
    'has_privileges' => [
      'privilege' => 'Read',
      'program' => 'GAP',
      'module' => 'Fields',
      'log' => 'Pest Control & Log'
    ],
    'room_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'name' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 255
    ]
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $rooms = $scope->daoFactory->get('gap\selfInspection\pestControl\Rooms');
    $isNameDuplicated = $rooms->hasByZoneIDAndName(
      $segment->get('zone_id'), 
      $request['name']
    );

    if ($isNameDuplicated) {
      throw new \Exception(
        'Failed to edit the room name; the name is already taken', 
        1
      );
    }

    $rooms->updateNameByID(
      $request['room_id'], $request['name']
    );
  }
];

?>
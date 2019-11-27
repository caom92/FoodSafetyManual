<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createAddService(
  'GAP',
  'Self Inspection',
  'Pest Control & Log',
  [
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
  function($scope, $request) {
    // count the number of stations in this room
    // so we can compute the position of this station and add it
    // in the last position
    $stations = $scope->daoFactory
      ->get('gap\selfInspection\pestControl\Stations');
    $numItemsInRoom = $stations->countByRoomID($request['room_id']);

    // store the item in the data base 
    return $stations->insert([
      'room_id' => $request['room_id'],
      'position' => $numItemsInRoom + 1,
      'is_active' => TRUE,
      'name' => $request['name']
    ]);
  }
);

?>
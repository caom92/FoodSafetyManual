<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createAddService(
  'GMP',
  'Pest Control',
  'Self Inspection',
  [
    'room_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'name' => [
      'type' => 'string',
      'min_length' => 2,
      'max_length' => 32
    ]
  ],
  function($scope, $request) {
    // count the number of stations in this room
    // so we can compute the position of this station and add it
    // in the last position
    $stations = $scope->daoFactory
      ->get('gmp\pestControl\selfInspection\Stations');
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
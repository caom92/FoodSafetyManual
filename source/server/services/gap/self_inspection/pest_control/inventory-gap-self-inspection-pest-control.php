<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createInventoryService(
  'GAP',
  'Fields',
  'Pest Control & Log',
  [
    'room_id' => [
      'type' => 'int',
      'min' => 1
    ]
  ],
  function($scope, $request) {
    return $scope->daoFactory->get('gap\selfInspection\pestControl\Stations')
      ->selectByRoomID($request['room_id']);

    // // get the session segment
    // $segment = $scope->session->getSegment('fsm');

    // // then, get the list of stations that are registered in the 
    // // same zone as the user
    // $stations = $scope->pestSelfInspectionRooms->selectByZoneID(
    //     $segment->get('zone_id'));
    
    // // then initialize the room array
    // $rooms = [];

    // // initialize temporal storage where the current room data will
    // // be stored
    // $room = [
    //     'id' => 0
    // ];

    // // visit each station read from the database
    // foreach ($stations as $station) {
    //     // check if the room that we are currently working with has
    //     // changed
    //     $hasRoomChanged = $station['room_id'] != $room['id'];
    //     if ($hasRoomChanged) {
    //         // if it has, push the current room to the final rooms 
    //         // storage if its data is not empty
    //         if ($room['id'] != 0) {
    //             array_push($rooms, $room);
    //         }

    //         // then, prepare a new temporal storage for the current
    //         // room and add the current station
    //         $room = [
    //             'id' => $station['room_id'],
    //             'name' => $station['room_name'],
    //             'stations' => []
    //         ];

    //         // check if the room has any stations assigned, and if 
    //         // this is the case, store it
    //         if (isset($station['id'])) {
    //             array_push($room['stations'], [
    //                 'id' => $station['id'],
    //                 'order' => $station['order'],
    //                 'name' => $station['name'],
    //                 'is_active' => $station['is_active']
    //             ]);
    //         }
    //     } else {
    //         // if the room has not change, then just add the station
    //         array_push($room['stations'], [
    //             'id' => $station['id'],
    //             'order' => $station['order'],
    //             'name' => $station['name'],
    //             'is_active' => $station['is_active']
    //         ]);
    //     }
    // }

    // // don't forget to save the last room data in the
    // // final storage
    // if ($room['id'] != 0) {
    //     array_push($rooms, $room);
    // }

    // // return the resulting array
    // return $rooms;
  }
);

?>
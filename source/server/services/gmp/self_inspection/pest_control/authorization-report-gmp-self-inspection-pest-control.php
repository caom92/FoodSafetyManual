<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createAuthorizationReportService(
  'GMP',
  'Packing',
  'Pest Control',
  [
    'items_name' => 'rooms',
    'extra_info' => [
      'notes',
    ],
    'function' => function($scope, $segment, $logDate) {
      // first, get the list of all active stations
      $stations = 
        $scope->daoFactory->get('gmp\selfInspection\pestControl\Logs')
          ->selectByCaptureDateID(
            $logDate['id']
          );

      // then initialize the room array
      $rooms = [];

      // initialize temporal storage where the current room data will
      // be stored
      $room = [
        'id' => 0
      ];

      // visit each station read from the database
      foreach ($stations as $station) {
        // check if the room that we are currently working with has
        // changed
        $hasRoomChanged = $station['room_id'] != $room['id'];
        if ($hasRoomChanged) {
          // if it has, push the current room to the final rooms 
          // storage if its data is not empty
          if ($room['id'] != 0) {
            array_push($rooms, $room);
          }

          // then, prepare a new temporal storage for the current
          // room and add the current station
          $room = [
            'id' => $station['room_id'],
            'name' => $station['room_name'],
            'stations' => [[
              'id' => $station['id'],
              'order' => $station['order'],
              'name' => $station['name'],
              'secured' => $station['secured'],
              'condition' => $station['condition'],
              'activity' => $station['activity'],
              'corrective_actions' => $station['corrective_actions'],
              'observations' => $station['observations']
            ]]
          ];
        } else {
          // if the room has not change, then just add the station
          array_push($room['stations'], [
            'id' => $station['id'],
            'order' => $station['order'],
            'name' => $station['name'],
            'secured' => $station['secured'],
            'condition' => $station['condition'],
            'activity' => $station['activity'],
            'corrective_actions' => $station['corrective_actions'],
            'observations' => $station['observations']
          ]);
        }
      }

      // don't forget to save the last room data in the
      // final storage
      if ($room['id'] != 0) {
        array_push($rooms, $room);
      }

      // return the resulting array
      return $rooms;
    }
  ]
);

?>
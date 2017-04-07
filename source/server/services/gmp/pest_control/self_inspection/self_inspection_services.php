<?php

namespace fsm\services\gmp\pestControl\selfInspection;

require_once realpath(dirname(__FILE__).'/../../../globals.php');

use fsm;

$gmpPestControlSelfInspectionServices = fsm\createServiceDescriptionFromTemplate(
    'GMP', 'Pest Control', 'Self Inspection', 
    'gmp-pest-control-self-inspection', 'gmp/pest_control/self_inspection/',
    [
        'log' => [
            'items_name' => 'rooms',
            'data_view' => function($scope, $segment) {
                // first, get the list of all active stations
                $stations = 
                    $scope->pestSelfInspectionStations->selectActiveByZoneID(
                        $segment->get('zone_id')
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
                                'name' => $station['name']
                            ]]
                        ];
                    } else {
                        // if the room has not change, then just add the station
                        array_push($room['stations'], [
                            'id' => $station['id'],
                            'order' => $station['order'],
                            'name' => $station['name']
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
        ],
        'report' => [
            'items_name' => 'rooms',
            'data_view' => function($scope, $segment, $logDate) {
                // first, get the list of all active stations
                $stations = 
                    $scope->pestSelfInspectionLogs->selectByCaptureDateID(
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
                                'corrective_actions' => 
                                    $station['corrective_actions']
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
                            'corrective_actions' => 
                                $station['corrective_actions']
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
        ],
        'capture' => [
            'requirements' => [
                'stations' => [
                    'type' => 'array',
                    'values' => [
                        'id' => [
                            'type' => 'int',
                            'min' => 1
                        ],
                        'is_secured' => [
                            'type' => 'bool'
                        ],
                        'condition' => [
                            'type' => 'bool'
                        ],
                        'activity' => [
                            'type' => 'bool'
                        ],
                        'corrective_actions' => [
                            'type' => 'string',
                            'max_length' => 128
                        ]
                    ]
                ]
            ],
            'data_view' => function($scope, $segment, $request, $logID) {
                // prepare the array of rows to insert to the database
                $rows = [];

                // visit each station
                foreach ($room['stations'] as $station) {
                    // and store its information in the row array
                    array_push($rows, [
                        'capture_date_id' => $logID,
                        'station_id' => $station['id'],
                        'is_secured' => $station['is_secured'],
                        'is_condition_acceptable' => $station['condition'],
                        'has_activity' => $station['activity'],
                        'corrective_actions' => $station['corrective_actions']
                    ]);
                }

                // finally, insert all the rows to the database
                return $scope->pestSelfInspectionLogs->insert($rows);
            }
        ],
        'inventory' => [
            'callback' => function($scope, $request) {
                // get the session segment
                $segment = $scope->session->getSegment('fsm');

                // then, get the list of stations that are registered in the 
                // same zone as the user
                $stations = $scope->pestSelfInspectionRooms->selectByZoneID(
                    $segment->get('zone_id'));
                
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
                            'stations' => []
                        ];

                        // check if the room has any stations assigned, and if 
                        // this is the case, store it
                        if (isset($station['id'])) {
                            array_push($room['stations'], [
                                'id' => $station['id'],
                                'order' => $station['order'],
                                'name' => $station['name'],
                                'is_active' => $station['is_active']
                            ]);
                        }
                    } else {
                        // if the room has not change, then just add the station
                        array_push($room['stations'], [
                            'id' => $station['id'],
                            'order' => $station['order'],
                            'name' => $station['name'],
                            'is_active' => $station['is_active']
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
        ],
        'add' => [
            'requirements' => [
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
            'callback' => function($scope, $request) {
                // count the number of stations in this room
                // so we can compute the position of this station and add it
                // in the last position
                $numItemsInRoom = 
                    $scope->pestSelfInspectionStations->countByRoomID(
                        $request['room_id']);

                // store the item in the data base 
                return $scope->pestSelfInspectionStations->insert([
                    'room_id' => $request['room_id'],
                    'position' => $numItemsInRoom + 1,
                    'is_active' => TRUE,
                    'name' => $request['name']
                ]);
            }
        ],
        'toggle' => [
            'dao' => 'fsm\database\gmp\pestControl\selfInspection\StationsDAO'
        ],
        'reorder' => [
            'dao' => 'fsm\database\gmp\pestControl\selfInspection\StationsDAO'
        ]
    ]
);

$gmpPestControlSelfInspectionServices['add-room-gmp-pest-control-self-inspection'] =
    [
        'requirements_desc' => [
            'logged_in' => ['Supervisor'],
            'has_privileges' => [
                'privilege' => 'Read',
                'program' => 'GMP',
                'module' => 'Pest Control',
                'log' => 'Self Inspection'
            ],
            'name' => [
                'type' => 'string',
                'min_length' => 2,
                'max_length' => 32
            ]
        ],
        'callback' => function($scope, $request) {
            $segment = $scope->session->getSegment('fsm');
           return  $scope->pestSelfInspectionRooms->insert([
                'zone_id' => $segment->get('zone_id'),
                'name' => $request['name']
            ]);
        }
    ];

?>
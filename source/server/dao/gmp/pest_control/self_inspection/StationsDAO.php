<?php

// Namespace for the project's Data Access Objects
namespace fsm\database\gmp\pestControl\selfInspection;

// Importing required classes
require_once realpath(dirname(__FILE__)."/../../../OrderedItemsDAO.php");

use fsm\database as db;


// Data Access Object for the gmp_pest_control_self_inspection_stations table
class StationsDAO extends db\OrderedItemsDAO
{
    // Creates an interface for interacting with the 
    // gmp_pest_control_self_inspection_stations table in the specified data base
    function __construct()
    {
        parent::__construct('gmp_pest_control_self_inspection_stations');
    }


    // Returns the number of stations associated to the specified room
    function countByRoomID($roomID)
    {
        return parent::count([ 
            'room_id' => $roomID
        ]);
    }


    // Returns a list of all stations registered in the room with the
    // especified ID
    function selectByRoomID($roomID)
    {
        return parent::select(
            [
                'id', 'name', 'position(order)', 'is_active'
            ],
            [
                'room_id' => $roomID,
                'ORDER' => [
                    'position'
                ]
            ]
        );
    }


    // Returns a list of all the active stations that have the especified 
    // zone ID
    // function selectActiveByZoneID($zoneID)
    // {
    //     return parent::select(
    //         [
    //             "r.id(room_id)",
    //             "r.name(room_name)",
    //             "$this->table.id(id)",
    //             "$this->table.name(name)",
    //             "$this->table.position(order)"
    //         ],
    //         [
    //             "r.zone_id" => $zoneID,
    //             'ORDER' => [
    //                 "r.id",
    //                 "$this->table.position"
    //             ]
    //         ],
    //         [
    //             '[><]gmp_pest_control_self_inspection_rooms(r)' => [
    //                 'room_id' => 'id'
    //             ]
    //         ]
    //     );
    // }
}

?>
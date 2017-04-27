<?php

// Namespace for the project's Data Access Objects
namespace fsm\database\gmp\pestControl\selfInspection;

// Importing required classes
require_once realpath(dirname(__FILE__)."/../../../InsertableDAO.php");

use fsm\database as db;


// Data Access Object for the gmp_pest_control_self_inspection_rooms table
class RoomsDAO extends db\InsertableDAO
{
    // Creates an interface for interacting with the 
    // gmp_pest_control_self_inspection_rooms table in the specified data base
    function __construct()
    {
        parent::__construct('gmp_pest_control_self_inspection_rooms');
    }


    // Returns an associative which contains a list of stations within the 
    // rooms of the specified zone grouped by room
    function selectByZoneID($zoneID)
    {
        return parent::select(
            [
                // "$this->table.id(room_id)",
                // "$this->table.name(room_name)",
                // "s.id(id)",
                // "s.name(name)",
                // "s.position(order)",
                // "s.is_active(is_active)"
                'id',
                'name'
            ],
            [
                "$this->table.zone_id" => $zoneID,
                // 'ORDER' => [
                //     "$this->table.id",
                //     "s.position"
                // ]
            ]
            // [
            //     '[>]gmp_pest_control_self_inspection_stations(s)' => [
            //         'id' => 'room_id'
            //     ]
            // ]
        );
    }
}

?>
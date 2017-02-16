<?php

// Namespace for the project's Data Access Objects
namespace fsm\database\gmp\packing\calibration;

// Importing required classes
require_once realpath(dirname(__FILE__)."/../../../DataAccessObject.php");

use fsm\database as db;

// Data Access Object for the gmp_packing_calibration_scales table
class ScalesDAO extends db\DataAccessObject
{
    // Creates an interface for interacting with the 
    // gmp_packing_calibration_scales table in the specified data base
    function __construct()
    {
        parent::__construct("gmp_packing_calibration_scales");
    }


    // Return an associative that contains the data of all active scales
    // that are registered in the zone with the especified ID
    function selectActiveByZoneID($zoneID)
    {
        return parent::select(
            [
                'id(id)',
                'type_id(type_id)',
                'st.name(type_name)',
                'serial_num(name)',
                'position(order)'
            ],
            [
                'AND' => [
                    'zone_id' => $zoneID,
                    'is_active' => TRUE
                ],
                'ORDER' => [
                    'type_id',
                    'order'
                ]
            ],
            [
                '[><]gmp_packing_scale_types(st)' => [
                    'type_id' => 'id'
                ]
            ]
        );
    }
}

?>
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


    // Return an associative array that contains the data of all active scales
    // that are registered in the zone with the especified ID
    function selectActiveByZoneID($zoneID)
    {
        return parent::select(
            [
                "$this->table.id(id)",
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
                '[><]gmp_packing_calibration_scale_types(st)' => [
                    'type_id' => 'id'
                ]
            ]
        );
    }


    // Returns an associative array that contains the data of all the scales
    // that are registered in the zone with the especified ID
    function selectAllByZoneID($zoneID)
    {
        return parent::select(
            [
                "$this->table.id(id)",
                'is_active',
                'type_id(type_id)',
                'st.name(type_name)',
                'serial_num(name)',
                'position(order)'
            ],
            [
                'zone_id' => $zoneID,
                'ORDER' => [
                    'type_id',
                    'order'
                ]
            ],
            [
                '[><]gmp_packing_calibration_scale_types(st)' => [
                    'type_id' => 'id'
                ]
            ]
        );
    }


    // Inverts the activation status of the scale with the specified ID
    function toggleActivationOfScale($scaleID)
    {
        return parent::$dataBase->query(
            "UPDATE $this->table
            SET is_active = !is_active
            WHERE id = '$scaleID'"
        )->fetchAll();
    }


    // Updates the position of the specified scale
    function updatePositionByID($scaleID, $position)
    {
        return parent::update(
            [ 'position' => $position ], 
            [ 'id' => $scaleID ]
        );
    }


    // Returns the number of scales associated to the specified zone
    function countByZoneAndTypeIDs($zoneID, $typeID)
    {
        return parent::count([ 
            'AND' => [
                'zone_id' => $zoneID,
                'type_id' => $typeID 
            ]
        ]);
    }


    // Creates a new scale in the specified zone and returns
    // the ID of the inserted element
    function insert($rows)
    {
        return parent::insert($rows);
    }

}

?>
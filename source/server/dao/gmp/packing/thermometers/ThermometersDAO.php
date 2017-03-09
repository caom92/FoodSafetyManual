<?php

// Namespace for the project's Data Access Objects
namespace fsm\database\gmp\packing\thermometers;

// Importing required classes
require_once realpath(dirname(__FILE__)."/../../../DataAccessObject.php");

use fsm\database as db;

// Data Access Object for the gmp_packing_thermometers_thermometers table
class ThermometersDAO extends db\DataAccessObject
{
    // Creates an interface for interacting with the 
    // gmp_packing_thermometers_thermometers table in the specified data base
    function __construct()
    {
        parent::__construct("gmp_packing_thermometers_thermometers");
    }


    // Returns a list of all the active thermometers that have the especified 
    // zone ID
    function selectActiveByZoneID($zoneID)
    {
        return parent::select(
            ['id', 'serial_num(name)'],
            [
                'AND' => [
                    'zone_id' => $zoneID,
                    'is_active' => TRUE
                ]
            ]
        );
    }


    // Toggle the activation status of the group with the especified ID
    function toggleActivationByID($thermoID)
    {
        return parent::$dataBase->query(
            "UPDATE $this->table
            SET is_active = !is_active
            WHERE id = '$thermoID'"
        )->fetchAll();
    }


    // Insert the specified rows to the table
    function insert($rows) 
    {
        return parent::insert($rows);
    }


    // Returns a list of all the groups from the database
    function selectAllByZoneID($zoneID)
    {
        return parent::select(
            [
                'id',
                'serial_num(name)',
                'is_active'
            ],
            [
                'zone_id' => $zoneID
            ]
        );
    }
}

?>
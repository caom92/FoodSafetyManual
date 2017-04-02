<?php

// Namespace for the project's Data Access Objects
namespace fsm\database\gmp\packing\handWash;

// Importing required classes
require_once realpath(dirname(__FILE__)."/../../../DataAccessObject.php");

use fsm\database as db;

// Data Access Object for the gmp_packing_hand_washing_characteristics table
class CharacteristicsDAO extends db\DataAccessObject
{
    // Creates an interface for interacting with the 
    // gmp_packing_hand_washing_characteristics table in the specified data base
    function __construct()
    {
        parent::__construct("gmp_packing_hand_washing_characteristics");
    }


    // Returns a list of all the active thermometers that have the especified 
    // zone ID
    function selectActiveByZoneID($zoneID)
    {
        return parent::select(
            ['id', 'name'],
            [
                'AND' => [
                    'zone_id' => $zoneID,
                    'is_active' => TRUE
                ]
            ]
        );
    }


    // Toggle the activation status of the group with the especified ID
    function toggleActivationByID($itemID)
    {
        return parent::$dataBase->query(
            "UPDATE $this->table
            SET is_active = !is_active
            WHERE id = '$itemID'"
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
                'name',
                'is_active'
            ],
            [
                'zone_id' => $zoneID
            ]
        );
    }
}

?>
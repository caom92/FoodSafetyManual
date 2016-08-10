<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataAccessObject.php");

// Data Access Object for the inventory table
class InventoryDAO extends DataAccessObject
{
    // Creates an interface for interacting with the inventory 
    // table in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "inventory");
    }


    // Returns an associative array containing the elements of the table
    // with the especified zone and module IDs
    function selectByZoneIDAndModuleID($zoneID, $moduleID)
    {
        return parent::select(['id', 'name', 'is_active(status)'], [
            'AND' => [
                'zone_id' => $zoneID,
                'module_id' => $moduleID
            ]
        ]);
    }
}

?>
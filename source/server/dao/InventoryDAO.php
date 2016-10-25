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


    // Returns an associative array containing the elements of the table
    // with the especified zone and module IDs which is_active flag is
    // set to 'true'
    function selectActiveByZoneIDAndModuleID($zoneID, $moduleID)
    {
        return parent::select(['id', 'name', 'is_active(status)'], [
            'AND' => [
                'zone_id' => $zoneID,
                'module_id' => $moduleID,
                'is_active' => 1 
            ]
        ]);
    }

    
    // Changes the status of the entry with the especified ID by the
    // one provided
    // [in]     id: the ID of the table entry which data is going to be
    //          updated
    // [in]     status: boolean value which indicates if the inventory 
    //          item is available or unavailable
    function updateStatusByID($id, $status)
    {
        parent::update(['is_active' => $status], ['id' => $id]);
    }


    // Inserts a new inventory item to the table using the especified data 
    // [in]     zoneID: the ID of the zone which the item belongs to
    // [in]     moduleID: the ID of the module which the item belongs to
    // [in]     name: a string that defines the name of the item that is 
    //          going to be inserted
    // [out]    return: the ID of the last newly added inventory item
    function insert($rows)
    {
        return parent::insert($rows);
    }
}

?>
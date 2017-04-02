<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataAccessObject.php");

use fsm\database as db;

// Data Access Object for the item_types table
class ItemTypesDAO extends DataAccessObject
{
    // Creates an interface for interacting with the 
    // item_types table in the specified data base
    function __construct()
    {
        parent::__construct("item_types");
    }


    // Returns an associative array that contains the info of all the
    // item types
    function selectAll()
    {
        return parent::select('*');
    }


    // Returns an associative array containing the information of all the 
    // items that are related to the specified area grouped by the item type
    // [in]     areaID: the ID of the area whose items are going to be 
    //          retrieved
    function selectByAreaID($areaID)
    {
        return parent::$dataBase->query(
            "SELECT 
                i.id AS id, 
                i.is_active AS is_active, 
                i.position AS position, 
                i.name AS name, 
                t.id AS type_id, 
                t.name AS type_name 
            FROM $this->table AS t
            LEFT JOIN items AS i 
                ON i.type_id = t.id AND i.area_id = $areaID
            ORDER BY area_id, type_id, position"
        )->fetchAll();
    }
}

?>
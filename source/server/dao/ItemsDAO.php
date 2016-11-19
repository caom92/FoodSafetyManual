<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataAccessObject.php");

// Data Access Object for the items table
class ItemsDAO extends DataAccessObject
{
    // Creates an interface for interacting with the 
    // items table in the specified data base
    function __construct()
    {
        parent::__construct("items");
    }


    // Returns an associative array containing the information of all the 
    // items that are related to the specified area
    // [in]     areaID: the ID of the area whose items are going to be 
    //          retrieved
    function selectByAreaID($areaID)
    {
        return parent::select(
            [ 
                "$this->table.id",
                'is_active', 
                'position', 
                "$this->table.name",
                'type' => [
                    't.id(type_id)', 
                    't.name(type_name)'
                ]  
            ],
            [ 
                'area_id' => $areaID,
                'ORDER' => [
                    'area_id',
                    'position'
                ]
            ],
            [
                '[><]item_types(t)' => [ 'type_id' => 'id' ]
            ]
        );
    }


    // Inverts the activation status of the item with the specified ID
    function toggleActivationByID($id)
    {
        return parent::$dataBase->query(
            "UPDATE $this->table
            SET is_active = !is_active
            WHERE id = '$id'"
        )->fetchAll();
    }


    // Creates a new inventory item in the specified area and returns
    // the ID of the inserted element
    function insert($rows)
    {
        return parent::insert($rows);
    }


    // Returns the number of items associated to the specified working area
    function countByAreaID($areaID)
    {
        return parent::count([ 'area_id' => $areaID ]);
    }
}

?>
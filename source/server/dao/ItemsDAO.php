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
                'name',
                'type' => [
                    't.id', 
                    't.name'
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


    // Creates a new inventory item in the specified area
    // [in]     areaID: the ID of the working area which the item will be 
    //          associated to
    // [in]     typeID: the ID of the type of the item to be inserted
    // [in]     position: the ordinal position to which the item will be 
    //          placed relative to the other items in the same working area
    // [in]     name: the name of the item
    // [out]    return: the ID of the newly added item
    function insert($areaID, $typeID, $position, $name)
    {
        return parent::insert([
            'area_id' => $areaID,
            'type_id' => $typeID,
            'is_active' => TRUE,
            'position' => $position,
            'name' => $name
        ]);
    }


    // Returns the number of items associated to the specified working area
    function countByAreaID($areaID)
    {
        return parent::count([ 'area_id' => $areaID ]);
    }
}

?>
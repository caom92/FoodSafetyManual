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
                    'type_id',
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
    function countByAreaAndTypeIDs($areaID, $typeID)
    {
        return parent::count([ 
            'AND' => [
                'area_id' => $areaID,
                'type_id' => $typeID 
            ]
        ]);
    }


    // Returns an associative which contains a list of items within the 
    // working areas of the specified zone grouped by area and item type
    function selectByZoneID($zoneID)
    {
        return parent::select(
            [
                'a.id(area_id)',
                'a.name(area_name)',
                't.id(type_id)',
                't.name(type_name)',
                "$this->table.id(item_id)",
                "$this->table.name(item_name)",
                "$this->table.position(item_order)"
            ],
            [
                'a.zone_id' => $zoneID,
                'ORDER' => [
                    'a.id',
                    't.id',
                    "$this->table.position"
                ]
            ],
            [
                '[><]working_areas(a)' => ['area_id' => 'id'],
                '[><]item_types(t)' => ['type_id' => 'id']
            ]
        );
    }


    // Updates the position of the specified item
    function updatePositionByID($id, $position)
    {
        return parent::update(
            [ 'position' => $position ], 
            [ 'id' => $id ]
        );
    }
}

?>
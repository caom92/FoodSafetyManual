<?php

// Namespace for the project's Data Access Objects
namespace fsm\database\gmp\packing\glass;

// Importing required classes
require_once realpath(dirname(__FILE__)."/../../../DataAccessObject.php");

use fsm\database as db;

// Data Access Object for the gmp_packing_glass_area_glass table
class AreaGlassDAO extends db\DataAccessObject
{
    // Creates an interface for interacting with the 
    // gmp_packing_glass_area_glass table in the specified data base
    function __construct()
    {
        parent::__construct("gmp_packing_glass_area_glass");
    }


    // Toggle the activation status of the area glass with the especified ID
    function toggleActivationByID($itemID)
    {
        return parent::$dataBase->query(
            "UPDATE $this->table
            SET is_active = !is_active
            WHERE id = '$itemID'"
        )->fetchAll();
    }


    // Returns the number of items associated to the specified working area
    function countByAreaID($areaID)
    {
        return parent::count(['area_id' => $areaID]);
    }


    // Insert the specified rows to the table
    function insert($rows) 
    {
        return parent::insert($rows);
    }


    // Returns a list of all items that belong to the working area with the 
    // especified ID
    function selectByAreaID($areaID)
    {
        return parent::select(
            [ 
                "$this->table.id",
                'position(order)',
                "$this->table.name",
                'quantity',
                'is_active'
            ],
            [ 
                'area_id' => $areaID,
                'ORDER' => [
                    'position'
                ]
            ]
        );
    }
}

?>
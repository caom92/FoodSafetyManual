<?php

// Namespace for the project's Data Access Objects
namespace fsm\database\gmp\packing\glass;

// Importing required classes
require_once realpath(dirname(__FILE__)."/../../../DataAccessObject.php");

use fsm\database as db;

// Data Access Object for the gmp_packing_glass_logs table
class LogsDAO extends db\DataAccessObject
{
    // Creates an interface for interacting with the 
    // gmp_packing_glass_logs table in the specified data base
    function __construct()
    {
        parent::__construct("gmp_packing_glass_logs");
    }


    // Insert the specified rows to the table
    function insert($rows) 
    {
        return parent::insert($rows);
    }


    // Returns a list of all the log data that has the especified capture date 
    // ID
    function selectByCaptureDateID($dateID)
    {
        return parent::select(
            [
                'a.id(area_id)',
                'a.name(area_name)',
                'i.id(item_id)',
                'i.name(item_name)',
                'i.position(item_order)',
                'i.quantity(item_quantity)',
                'is_approved(item_status)'
            ],
            [
                'capture_date_id' => $dateID,
                'ORDER' => [
                    'a.id', 'i.position'
                ]
            ],
            [
                '[><]gmp_packing_glass_area_glass(i)' => [
                    'area_glass_id' => 'id'
                ],
                '[><]working_areas(a)' => [
                    'i.area_id' => 'id'
                ]
            ]
        );
    }
}

?>
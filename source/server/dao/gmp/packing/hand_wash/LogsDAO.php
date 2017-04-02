<?php

// Namespace for the project's Data Access Objects
namespace fsm\database\gmp\packing\thermometers;

// Importing required classes
require_once realpath(dirname(__FILE__)."/../../../DataAccessObject.php");

use fsm\database as db;

// Data Access Object for the gmp_packing_hand_washing_log table
class LogsDAO extends db\DataAccessObject
{
    // Creates an interface for interacting with the 
    // gmp_packing_hand_washing_log table in the specified data base
    function __construct()
    {
        parent::__construct("gmp_packing_hand_washing_log");
    }


    // Insert the specified rows to the table
    function insert($rows) 
    {
        return parent::insert($rows);
    }


    // Returns a list of all the log data that has the specified capture date 
    // ID
    function selectByCaptureDateID($dateID)
    {
        return parent::$dataBase->query(
            "SELECT
                c.id AS id,
                c.name,
                is_acceptable
            FROM $this->table
            INNER JOIN gmp_packing_hand_washing_characteristics AS c
                ON $this->table.characteristic_id = c.id
            WHERE capture_date_id = $dateID"
        )->fetchAll();
    }
}

?>
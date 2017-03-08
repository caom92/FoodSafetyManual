<?php

// Namespace for the project's Data Access Objects
namespace fsm\database\gmp\packing\scissors;

// Importing required classes
require_once realpath(dirname(__FILE__)."/../../../DataAccessObject.php");

use fsm\database as db;

// Data Access Object for the gmp_packing_scissors_logs table
class LogsDAO extends db\DataAccessObject
{
    // Creates an interface for interacting with the 
    // gmp_packing_scissors_logs table in the specified data base
    function __construct()
    {
        parent::__construct("gmp_packing_scissors_logs");
    }


    // Insert the specified rows to the table
    function insert($rows) 
    {
        return parent::insert($row);
    }


    // Returns a list of all the log data that has the especified capture date 
    // ID
    function selectByCaptureDateID($dateID)
    {
        return parent::$dataBase->query(
            "SELECT
                g.id AS id,
                g.name AS name,
                DATE_FORMAT(time, '%H:%i') AS time,
                g.quantity AS quantity,
                was_approved AS approved,
                was_returned AS condition,
                corrective_actions AS corrective_action,
                was_sanitized AS is_sanitized
            FROM $this->table
            INNER JOIN gmp_packing_scissors_groups AS g
                ON $this->table.group_id = g.id
            WHERE capture_date_id = $logID"
        )->fetchAll();
    }
}

?>
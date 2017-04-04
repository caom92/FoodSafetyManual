<?php

// Namespace for the project's Data Access Objects
namespace fsm\database\gmp\packing\atp;

// Importing required classes
require_once realpath(dirname(__FILE__)."/../../../DataAccessObject.php");

use fsm\database as db;

// Data Access Object for the gmp_packing_atp_time_logs table
class TimeLogsDAO extends db\DataAccessObject
{
    // Creates an interface for interacting with the 
    // gmp_packing_atp_time_logs table in the specified data base
    function __construct()
    {
        parent::__construct("gmp_packing_atp_time_logs");
    }


    // Returns an associative array with all the entries in the table that have
    // the especified captured log ID
    function selectByCaptureDateID($logID)
    {
        return parent::$dataBase->query(
            "SELECT
                $this->table.id AS time_log_id,
                a.id AS area_id,
                a.name AS area_name,
                DATE_FORMAT(time, '%H:%i') AS time
            FROM $this->table
            INNER JOIN working_areas AS a
                ON $this->table.area_id = a.id
            WHERE capture_date_id = $logID"
        )->fetchAll();
    }


    // Insert new rows with a capture date ID and a time to the table
    function insert($rows)
    {
        return parent::insert($rows);
    }
}

?>
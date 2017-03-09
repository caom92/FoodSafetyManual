<?php

// Namespace for the project's Data Access Objects
namespace fsm\database\gmp\packing\calibration;

// Importing required classes
require_once realpath(dirname(__FILE__)."/../../../DataAccessObject.php");

use fsm\database as db;

// Data Access Object for the gmp_packing_calibration_time_logs table
class TimeLogsDAO extends db\DataAccessObject
{
    // Creates an interface for interacting with the 
    // gmp_packing_calibration_time_logs table in the specified data base
    function __construct()
    {
        parent::__construct("gmp_packing_calibration_time_logs");
    }


    // Returns an associative array with all the entries in the table that have
    // the especified captured log ID
    function selectByCaptureDateID($logID)
    {
        return parent::$dataBase->query(
            "SELECT
                DATE_FORMAT(time, '%H:%i') AS time,
                s.type_id AS type_id,
                st.name AS type_name,
                s.position AS `order`,
                s.serial_num AS scale_name,
                sl.test AS test,
                sl.was_test_passed AS status,
                sl.was_scale_sanitized AS is_sanitized
            FROM $this->table
            INNER JOIN gmp_packing_calibration_scale_logs AS sl
                ON $this->table.id = sl.time_log_id
            INNER JOIN gmp_packing_calibration_scale AS s
                ON sl.scale_id = s.id
            INNER JOIN gmp_packing_scale_types AS st
                ON s.type_id = st.id
            WHERE capture_date_id = $logID
            ORDER BY type_id, scale_name"
        )->fetchAll();
    }


    // Insert new rows with a capture date ID and a time to the table
    function insert($rows)
    {
        return parent::insert($rows);
    }
}

?>
<?php

// Namespace for the project's Data Access Objects
namespace fsm\database\gmp\packing\calibration;

// Importing required classes
require_once realpath(dirname(__FILE__)."/../../../DataAccessObject.php");

use fsm\database as db;

// Data Access Object for the gmp_packing_calibration_scale_logs table
class ScaleLogsDAO extends db\DataAccessObject
{
    // Creates an interface for interacting with the 
    // gmp_packing_calibration_scale_logs table in the specified data base
    function __construct()
    {
        parent::__construct("gmp_packing_calibration_scale_logs");
    }


    // Insert new rows with captured log data to the table
    function insert($rows)
    {
        return parent::insert($rows);
    }
}

?>
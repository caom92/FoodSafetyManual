<?php

// Namespace for the project's Data Access Objects
namespace fsm\database\gmp\packing\thermometers;

// Importing required classes
require_once realpath(dirname(__FILE__)."/../../../DataAccessObject.php");

use fsm\database as db;

// Data Access Object for the gmp_packing_thermometers_time_logs table
class TimeLogsDAO extends db\DataAccessObject
{
    // Creates an interface for interacting with the 
    // gmp_packing_thermometers_time_logs table in the specified data base
    function __construct()
    {
        parent::__construct("gmp_packing_thermometers_time_logs");
    }
}

?>
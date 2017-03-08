<?php

// Namespace for the project's Data Access Objects
namespace fsm\database\gmp\packing\thermometers;

// Importing required classes
require_once realpath(dirname(__FILE__)."/../../../DataAccessObject.php");

use fsm\database as db;

// Data Access Object for the gmp_packing_thermometers_logs table
class LogsDAO extends db\DataAccessObject
{
    // Creates an interface for interacting with the 
    // gmp_packing_thermometers_logs table in the specified data base
    function __construct()
    {
        parent::__construct("gmp_packing_thermometers_logs");
    }


    // Insert the specified rows to the table
    function insert($rows) 
    {
        return parent::insert($rows);
    }
}

?>
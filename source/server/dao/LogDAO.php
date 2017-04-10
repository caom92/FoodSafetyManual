<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/../../../InsertableDAO.php");


// A data access object which represents a table in the data base that will 
// store the actual data of one of the logs in the system
abstract class LogDAO extends InsertableDAO
{
    // Creates an interface for interacting with the especified table in the 
    // data base
    function __construct($tableName)
    {
        parent::__construct($tableName);
    }


    // Returns a list of all the log data that has the especified capture date 
    // ID
    abstract function selectByCaptureDateID($dateID);
}

?>
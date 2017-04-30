<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataAccessObject.php");

use fsm\database as db;

// Data Access Object for the shifts table
class ShiftsDAO extends DataAccessObject
{
    // Creates an interface for interacting with the 
    // shifts table in the specified data base
    function __construct()
    {
        parent::__construct("shifts");
    }


    // Returns an associative array with the info of every shift
    // stored in the data base
    function selectAll()
    {
        return parent::select('*');
    }
}

?>
<?php

// Namespace for the project's Data Access Objects
namespace fsm\database\ssop\preop;

// Importing required classes
require_once realpath(dirname(__FILE__)."/../DataAccessObject.php");

use fsm\database as db;

// Data Access Object for the workplace_area_hardware table
class WorkplaceAreaDAO extends db\DataAccessObject
{
    // Creates an interface for interacting with the 
    // workplace_area_hardware table in the specified data base
    function __construct()
    {
        parent::__construct("workplace_area_hardware");
    }
}

?>
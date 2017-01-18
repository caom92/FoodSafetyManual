<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataAccessObject.php");

use fsm\database as db;

// Data Access Object for the supervisors_employees table
class SupervisorsEmployeesDAO extends DataAccessObject
{
    // Creates an interface for interacting with the 
    // supervisors_employees table in the specified data base
    function __construct()
    {
        parent::__construct("supervisors_employees");
    }
}

?>
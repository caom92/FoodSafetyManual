<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataAccessObject.php");

use fsm\database as db;

// Data Access Object for the roles table
class RolesDAO extends DataAccessObject
{
    // Creates an interface for interacting with the 
    // roles table in the specified data base
    function __construct()
    {
        parent::__construct("roles");
    }


    // Returns an associative array with the info of every privilege
    // stored in the data base
    function selectAll()
    {
        return parent::select('*');
    }
}

?>
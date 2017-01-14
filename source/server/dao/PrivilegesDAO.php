<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataAccessObject.php");

use fsm\database as db;

// Data Access Object for the privileges table
class PrivilegesDAO extends DataAccessObject
{
    // Creates an interface for interacting with the 
    // privileges table in the specified data base
    function __construct()
    {
        parent::__construct("privileges");
    }


    // Returns an associative array with the info of every privilege
    // stored in the data base
    function selectAll()
    {
        return parent::select('*');
    }


    // Returns the ID of the privilege with the specified name
    function getIDByName($name)
    {
        $row = parent::get(['id'], ['name' => $name]);
        return (count($row) > 0) ? $row['id'] : NULL;
    }
}

?>
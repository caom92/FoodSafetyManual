<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataAccessObject.php");

use fsm\database as db;

// Data Access Object for the item_types table
class ItemTypesDAO extends DataAccessObject
{
    // Creates an interface for interacting with the 
    // item_types table in the specified data base
    function __construct()
    {
        parent::__construct("item_types");
    }


    // Returns an associative array that contains the info of all the
    // item types
    function selectAll()
    {
        return parent::select([
            'id', 'name'
        ]);
    }
}

?>
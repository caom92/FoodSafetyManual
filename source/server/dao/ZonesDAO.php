<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataAccessObject.php");

// Data Access Object for the zones table
class ZonesDAO extends DataAccessObject
{
    // Creates an interface for interacting with the 
    // zones table in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "zones");
    }


    // Returns an associative array containing all the data elements
    // of the table
    // [out]    return: an associative array with the data contained in
    //          the data base table
    function selectAll()
    {
        return parent::select("*");
    }
}

?>
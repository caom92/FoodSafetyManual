<?php

// Namespace for the project's Data Access Objects
namespace espresso\dao;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataBaseTable.php");

// Data Access Object for the procedures table
class Procedures extends DataBaseTable
{
    // Creates an interface for interacting with the procedures 
    // table in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "procedures");
    }
    
    
    // Returns an associative array containing all the data elements
    // of the table
    // [out]    return: an associative array with the data contained in
    //          the data base table
    function getAll()
    {
        return parent::select("*");
    }
}

?>
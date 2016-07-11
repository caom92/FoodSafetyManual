<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataAccessObject.php");

// Data Access Object for the privileges table
class PrivilegesDAO extends DataAccessObject
{
    // Creates an interface for interacting with the 
    // privileges table in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "privileges");
    }


    // Returns an associative array containing the name and ID of the 
    // privilege that is assigned to a user by default when no privilege
    // is especified for him for a certain module
    function selectDefault()
    {
        $result = parent::select('*', ['name' => 'None']);
        return $result[0];
    }


    // Returns the ID of the privilege with the given name if it exists in 
    // the data base or NULL otherwise
    function selectIDByName($privilege)
    {
        return parent::select('id', [ 'name' => $privilege ]);
    }


    // Returns an associative array containing all the data elements
    // of the table
    // [out]    return: an associative array with the data contained in
    //          the data base table
    function selectAll()
    {
        return parent::select('*');
    }
}

?>
<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataAccessObject.php");

// Data Access Object for the roles table
class RolesDAO extends DataAccessObject
{
    // Creates an interface for interacting with the roles 
    // table in the specified data base
    function __construct()
    {
        parent::__construct("roles");
    }
    
    
    // Returns the ID of the role with the given name if it exists in 
    // the data base or NULL otherwise
    function getIDByName($role)
    {
        return parent::get('id', [ 'name' => $role ]);
    }


    // Returns an associative with the info of all the roles
    function selectAll()
    {
        return parent::select('*');
    }
}

?>
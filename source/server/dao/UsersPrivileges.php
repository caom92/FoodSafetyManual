<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataAccessObject.php");

// Data Access Object for the users table
class UsersPrivilegesDAO extends DataAccessObject
{
    // Creates an interface for interacting with the 
    // users table in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "users_privileges");
    }


    function selectByUserID($userID)
    {
        // TODO 
        return parent::join('*',
            [
                '[><]zones' => [ 'id' => '']
            ]
        );
    }
}

?>
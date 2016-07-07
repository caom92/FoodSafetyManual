<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataAccessObject.php");

// Data Access Object for the users_zones_modules_privileges table
class UsersZonesModulesPrivilegesDAO extends DataAccessObject
{
    // Creates an interface for interacting with the 
    // users table in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, 
            "users_zones_modules_privileges");
    }


    // Returns the privilege data about every module of the user with the 
    // especified ID in the form of an associative array
    // [in]     userID: the ID of the user which privileges we want to 
    //          retrieve
    // [out]    return: an associative array if the user was found in the
    //          database or NULL otherwise
    function selectByUserID($userID)
    {
        return parent::join(
            [
                '[><]zones(z)' => [ 'zone_id' => 'id' ],
                '[><]modules(m)' => [ 'module_id' => 'id' ],
                '[><]programs(p)' => [ 'm.program_id' => 'id' ],
                '[><]privileges(pr)' => [ 'privilege_id' => 'id']
            ],
            [
                'z.id(zone_id)',
                'z.name(zone_name)',
                'p.id(program_id)',
                'p.name(program_name)',
                'm.id(module_id)',
                'm.name(module_name)',
                'pr.id(privilege_id)',
                'pr.name(privilege_name)'
            ],
            [
                'user_id' => $userID
            ]
        );
    }
}

?>
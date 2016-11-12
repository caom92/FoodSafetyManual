<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataAccessObject.php");

// Data Access Object for the modules table
class ModulesDAO extends DataAccessObject
{
    // Creates an interface for interacting with the modules 
    // table in the specified data base
    function __construct()
    {
        parent::__construct("modules");
    }
    
    
    // Returns the ID of the module with the given name if it exists in 
    // the data base or NULL otherwise
    function getIDByName($module)
    {
        return parent::get('id', [ 'name' => $module ]);
    }


    // Returns an associative array containing the data of the modules that 
    // belong to the program with the especified ID
    // [in]     programID: the ID of the program which programs is going to
    //          be retrieve
    // [out]    return: an associative array if the especified program has
    //          any modules or NULL otherwise
    function selectByProgramID($programID)
    {
        return parent::select(['id', 'name'], ['program_id' => $programID]);
    }


    // Returns an associative array containing a list of all the modules stored
    // in the data base alongside the program they belong to and the 'read'
    // privilege data
    // [out]    return: an associative array if there are any modules or NULL
    //          otherwise
    function selectAllWithReadPrivilege()
    {
        return parent::$dataBase->query(
            "SELECT 
                p.id AS program_id,
                p.name AS program_name,
                m.id AS module_id,
                m.name AS module_name,
                r.id AS privilege_id,
                r.name AS privilege_name
            FROM modules AS m 
                INNER JOIN programs AS p
                    ON m.program_id = p.id
                INNER JOIN `privileges` AS r
                    ON r.name = 'Read'
            WHERE 1
            ORDER BY p.id, m.id"
        )->fetchAll();
    }
}

?>
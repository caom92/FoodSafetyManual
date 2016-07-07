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
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "modules");
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
}

?>
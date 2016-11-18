<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataAccessObject.php");

// Data Access Object for the programs table
class ProgramsDAO extends DataAccessObject
{
    // Creates an interface for interacting with the programs 
    // table in the specified data base
    function __construct()
    {
        parent::__construct("programs");
    }


    // Returns the ID of the program with the given name if it exists in 
    // the data base or NULL otherwise
    // function getIDByName($program)
    // {
    //     return parent::get('id', [ 'name' => $program ]);
    // }


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
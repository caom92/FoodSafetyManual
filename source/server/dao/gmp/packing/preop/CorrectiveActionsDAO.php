<?php

// Namespace for the project's Data Access Objects
namespace fsm\database\gmp\packing\preop;

// Importing required classes
require_once realpath(dirname(__FILE__)."/../../../DataAccessObject.php");

use fsm\database as db;

// Data Access Object for the gmp_packing_preop_corrective_actions table
class CorrectiveActionsDAO extends db\DataAccessObject
{
    // Creates an interface for interacting with the 
    // gmp_packing_preop_corrective_actions table in the specified data base
    function __construct()
    {
        parent::__construct("gmp_packing_preop_corrective_actions");
    }


    // Returns an associative array that contains the info of all the corrective 
    // actions
    function selectAll()
    {
        return parent::select('*', ['name[!]' => 'Other']);
    }
}

?>
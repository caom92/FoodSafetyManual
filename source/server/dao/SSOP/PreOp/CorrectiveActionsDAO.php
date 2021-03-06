<?php

// Namespace for the project's Data Access Objects
namespace fsm\database\ssop\preop;

// Importing required classes
require_once realpath(dirname(__FILE__)."/../../DataAccessObject.php");

use fsm\database as db;

// Data Access Object for the ssop_pre_op_corrective_actions table
class CorrectiveActionsDAO extends db\DataAccessObject
{
    // Creates an interface for interacting with the 
    // ssop_pre_op_corrective_actions table in the specified data base
    function __construct()
    {
        parent::__construct("ssop_pre_op_corrective_actions");
    }
}

?>
<?php

// Namespace for the project's Data Access Objects
namespace fsm\database\gmp\packing\preop;

// Importing required classes
require_once realpath(dirname(__FILE__)."/../../../DataAccessObject.php");

use fsm\database as db;

// Data Access Object for the gmp_packing_preop_areas_log table
class AreasLogDAO extends db\DataAccessObject
{
    // Creates an interface for interacting with the 
    // gmp_packing_preop_areas_log table in the specified data base
    function __construct()
    {
        parent::__construct("gmp_packing_preop_areas_log");
    }


    // Inserts the specified data elements into the table in question
    // [in]    rows: an array of associative arrays that define the column 
    //         names and their corresponding values to be inserted into the 
    //         table
    // [out]   return: the ID of the last inserted row
    function insert($rows)
    {
        return parent::insert($rows);
    }


    // Returns an associative array with the per area log info that was
    // captured in a specific date defined by the specified log capture 
    // date ID
    function selectByLogID($logID)
    {
        return parent::select('*', ['capture_date_id' => $logID]);
    }

    function updateByCapturedLogID($changes, $logID)
    {
        return parent::update($changes, ['capture_date_id']);
    }
}

?>
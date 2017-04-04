<?php

// Namespace for the project's Data Access Objects
namespace fsm\database\gmp\packing\atp;

// Importing required classes
require_once realpath(dirname(__FILE__)."/../../../DataAccessObject.php");

use fsm\database as db;

// Data Access Object for the gmp_packing_atp_logs table
class LogsDAO extends db\DataAccessObject
{
    // Creates an interface for interacting with the 
    // gmp_packing_atp_logs table in the specified data base
    function __construct()
    {
        parent::__construct("gmp_packing_atp_logs");
    }


    // Insert new rows with captured log data to the table
    function insert($rows)
    {
        return parent::insert($rows);
    }


    // Retrieves a list of rows with the data registered on the time log
    // with the especified ID
    function selectByTimeLogID($timeLogID)
    {
        return parent::select(
            [
                'id',
                'test_num(test_number)',
                'test1',
                'was_test1_passed(results1)',
                'corrective_action',
                'test2',
                'was_test2_passed(results2)'
            ],
            [
                'time_log_id' => $timeLogID
            ]
        );
    }
}

?>
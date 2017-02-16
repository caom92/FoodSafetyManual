<?php

// Namespace for the project's Data Access Objects
namespace fsm\database\gmp\packing\calibration;

// Importing required classes
require_once realpath(dirname(__FILE__)."/../../../DataAccessObject.php");

use fsm\database as db;

// Data Access Object for the gmp_packing_calibration_time_logs table
class TimeLogsDAO extends db\DataAccessObject
{
    // Creates an interface for interacting with the 
    // gmp_packing_calibration_time_logs table in the specified data base
    function __construct()
    {
        parent::__construct("gmp_packing_calibration_time_logs");
    }


    // Returns an associative array with all the entries in the table that have
    // the especified captured log ID
    function selectByCaptureDateID($logID)
    {
        return parent::select(
            [
                'time',
                's.type_id(type_id)',
                'st.name(type_name)',
                's.position(order)',
                's.serial_num(scale_name)',
                'sl.test(test)',
                'sl.was_test_passed(status)',
                'sl.was_scale_sanitized(is_sanitized)'
            ],
            [
                'capture_date_id' => $logID,
                'ORDER' => [
                    'type_id',
                    'scale_name'
                ]
            ],
            [
                '[><]gmp_packing_calibration_scale_logs(sl)' => [
                    'id' => 'time_log_id'
                ],
                '[><]gmp_packing_calibration_scales(s)' => [
                    'sl.scale_id' => 'id'
                ],
                '[><]gmp_packing_calibration_scale_types(st)' => [
                    's.type_id' => 'id'
                ]
            ]
        );
    }


    // Insert new rows with a capture date ID and a time to the table
    function insert($rows)
    {
        return parent::insert($rows);
    }
}

?>
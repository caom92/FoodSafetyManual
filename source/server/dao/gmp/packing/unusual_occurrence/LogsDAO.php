<?php

// Namespace for the project's Data Access Objects
namespace fsm\database\gmp\packing\unusualOccurrence;

// Importing required classes
require_once realpath(dirname(__FILE__)."/../../../LogDAO.php");

use fsm\database as db;


// Data Access Object for the gmp_packing_unusual_occurrence_logs table
class LogsDAO extends db\LogDAO
{
    // Creates an interface for interacting with the 
    // gmp_packing_unusual_occurrence_logs table in the specified data base
    function __construct()
    {
        parent::__construct('gmp_packing_unusual_occurrence_logs');
    }


    // Returns a list of all the log data that has the especified capture date 
    // ID
    function selectByCaptureDateID($dateID)
    {
        return parent::select(
            [
                'time',
                's.name(shift)',
                'a.name(area)',
                'p.code(product_code)',
                'p.name(product_name)',
                'batch',
                'description',
                'corrective_action',
                'album_url'
            ],
            [
                'capture_date_id' => $dateID
            ],
            [
                '[><]shifts(s)' => [
                    'shift_id' => 'id'
                ],
                '[><]working_areas(a)' => [
                    'area_id' => 'id'
                ],
                '[><]products(p)' => [
                    'product_id' => 'id'
                ]
            ]
        );
    }
}

?>
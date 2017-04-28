<?php

// Namespace for the project's Data Access Objects
namespace fsm\database\gmp\pestControl\selfInspection;

// Importing required classes
require_once realpath(dirname(__FILE__)."/../../../LogDAO.php");

use fsm\database as db;


// Data Access Object for the gmp_pest_control_self_inspection_logs table
class LogsDAO extends db\LogDAO
{
    // Creates an interface for interacting with the 
    // gmp_pest_control_self_inspection_logs table in the specified data base
    function __construct()
    {
        parent::__construct('gmp_pest_control_self_inspection_logs');
    }


    // Returns a list of all the log data that has the especified capture date 
    // ID
    function selectByCaptureDateID($dateID)
    {
        return parent::select(
            [
                'r.id(room_id)',
                'r.name(room_name)',
                's.id(id)',
                's.name(name)',
                's.position(order)',
                'is_secured(secured)',
                'is_condition_acceptable(condition)',
                'has_activity(activity)',
                'corrective_actions'
            ],
            [
                'capture_date_id' => $dateID,
                'ORDER' => [
                    'r.id', 's.position'
                ]
            ],
            [
                '[><]gmp_pest_control_self_inspection_stations(s)' => [
                    'station_id' => 'id'
                ],
                '[><]gmp_pest_control_self_inspection_stations(r)' => [
                    's.room_id' => 'id'
                ]
            ]
        );
    }
}

?>
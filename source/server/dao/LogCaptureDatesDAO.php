<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataAccessObject.php");

// Data Access Object for the log_capture_dates table
class LogCaptureDatesDAO extends DataAccessObject
{
    // Creates an interface for interacting with the 
    // log_capture_dates table in the specified data base
    function __construct()
    {
        parent::__construct("log_capture_dates");
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


    // Returns the ID of the log of the specified type and with entries of the
    // specified zone, was captured at the specified date
    // [in]     date: the date that the log that we are looking for was 
    //          captured
    // [in]     logID: the ID of the log type that we are looking for
    // [in]     zoneID: the ID of the zone which the log we are looking 
    //          for had entries to
    // [out]    return: the ID of the log
    function getIDByDateLogIDAndZoneID($date, $logID, $zoneID)
    {
        $rows = parent::select(
            "$this->table.id", 
            [
                'AND' => [
                    'log_id' => $logID, 
                    'date' => $date,
                    'u.zone_id' => $zoneID
                ]
            ],
            [
                '[><]users(u)' => [
                    'user_id' => 'id'
                ]
            ]
        );

        return $rows[0]['id'];
    }


    // Checks if there is an entry that was registered on the specified date 
    // for the specified log, returning true if this is the case or false 
    // otherwise
    function hasByDateAndLogID($date, $logID)
    {
        return parent::has([
            'date' => $date,
            'log_id' => $logID
        ]);
    }
}

?>
<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataAccessObject.php");

// Data Access Object for the captured_logs table
class CapturedLogsDAO extends DataAccessObject
{
    // Creates an interface for interacting with the 
    // captured_logs table in the specified data base
    function __construct()
    {
        parent::__construct("captured_logs");
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


    // Returns the IDs of all the logs of the specified type and with entries 
    // of the specified zone, and that where captured in the specified date 
    // interval
    // [in]     date: the date that the log that we are looking for was 
    //          captured
    // [in]     logID: the ID of the log type that we are looking for
    // [in]     zoneID: the ID of the zone which the log we are looking 
    //          for had entries to
    // [out]    return: the ID of the log
    function selectDateAndIDByDateIntervalLogIDAndZoneID(
        $startDate, 
        $endDate, 
        $logID, 
        $zoneID
    )
    {
        return parent::select(
            [
                "$this->table.id",
                'capture_date(date)'
            ], 
            [
                'AND' => [
                    'log_id' => $logID, 
                    'capture_date[>=]' => $startDate,
                    'capture_date[<=]' => $endDate,
                    'u.zone_id' => $zoneID
                ]
            ],
            [
                '[><]users(u)' => [
                    'user_id' => 'id'
                ]
            ]
        );
    }


    // Checks if there is an entry that was registered on the specified date 
    // for the specified log, returning true if this is the case or false 
    // otherwise
    function hasByDateAndLogID($date, $logID)
    {
        return parent::has(
            [
                'AND' => [
                    'capture_date' => $date,
                    'log_id' => $logID
                ]
            ]
        );
    }


    // Returns a list of all the unapproved logs captured by the especified user
    function selectUnapprovedLogsByUserID($userID)
    {
        return parent::$dataBase->query(
            "SELECT 
                t.id AS captured_log_id,
                s.id AS status_id,
                s.name AS status_name,
                p.name AS program_name,
                m.name AS module_name,
                l.name AS log_name,
                t.user_id AS employee_id,
                u.employee_num AS employee_num,
                u.first_name,
                u.last_name,
                t.capture_date AS capture_date,
                l.name_suffix AS service_name
            FROM 
                $this->table AS t
            INNER JOIN
                log_status AS s
                    ON t.status_id = s.id
            INNER JOIN 
                logs AS l
                    ON t.log_id = l.id
            INNER JOIN 
                modules AS m
                    ON l.module_id = m.id
            INNER JOIN
                programs AS p
                    ON m.program_id = p.id
            INNER JOIN
                users AS u
                    ON t.user_id = u.id
            WHERE
                t.user_id = $userID AND
                t.status_id != (
                    SELECT id FROM log_status WHERE name = ".
                    parent::$dataBase->quote('Approved')."
                )"
        )->fetchAll();
    }


    // Returns the ID of the user that captured the log of the entry with the 
    // especified user
    function selectUserIDByID($logID)
    {
        $rows = parent::get(
            ['user_id'], 
            ['id' => $logID]
        );
        return (count($rows) > 0) ? $rows['user_id'] : NULL;
    }


    // Updates the status of the log with the especified ID to 'Approved'
    function updateStatusToApprovedByID($logID)
    {
        return parent::$dataBase->query(
            "UPDATE 
                $this->table 
                SET 
                    status_id = (
                        SELECT id FROM log_status WHERE name = ".
                        parent::$dataBase->quote('Approved')."
                    )
                WHERE 
                    id = $logID"
        );
    }


    // Updates the status of the log with the especified ID to 'Rejected'
    function updateStatusToRejectedByID($logID)
    {
        return parent::$dataBase->query(
            "UPDATE 
                $this->table 
                SET 
                    status_id = (
                        SELECT id FROM log_status WHERE name = ".
                        parent::$dataBase->quote('Rejected')."
                    )
                WHERE 
                    id = $logID"
        );
    }


    // Returns the status name that the log with the especified ID has
    function getStatusByID($logID)
    {
        $rows = parent::select(
            ['s.name(status)'], 
            ["$this->table.id" => $logID],
            ['[><]log_status(s)' => ['status_id' => "id"]]
        );
        return (count($rows) > 0) ? $rows[0]['status'] : NULL;
    }
}

?>
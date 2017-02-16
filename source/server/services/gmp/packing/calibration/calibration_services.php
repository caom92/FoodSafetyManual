<?php

namespace fsm\services\gmp\packing\calibration;

require_once realpath(dirname(__FILE__).'/../../../globals.php');
require_once realpath(dirname(__FILE__).'/../../../../dao/CapturedLogsDAO.php');
require_once realpath(dirname(__FILE__).'/../../../../dao/LogsDAO.php');
require_once realpath(dirname(__FILE__).
    '/../../../../dao/gmp/packing/calibration/TimeLogsDAO.php');
require_once realpath(dirname(__FILE__).
    '/../../../../dao/gmp/packing/calibration/ScalesDAO.php');
require_once realpath(dirname(__FILE__).
    '/../../../../dao/gmp/packing/calibration/ScaleLogsDAO.php');
require_once realpath(dirname(__FILE__).'/../../../../dao/UsersDAO.php');

use fsm\database\gmp\packing\calibration as cal;
use fsm\database as db;

$gmpPackingCalServices = [
    'upload-manual-gmp-packing-scale-calibration' => [
        'requirements_desc' => [
            'logged_in' => ['Director', 'Manager', 'Supervisor'],
            'has_privilege' => [
                'privilege' => 'Read',
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Daily Scale Calibration Check'
            ],
            'files' => [
                'name' => 'manual_files',
                'format' => 'document'
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\calibration\uploadManualFile'
    ],
    'report-gmp-packing-scale-calibration' => [
        'requirements_desc' => [
            'logged_in' => ['Director', 'Manager', 'Supervisor', 'Employee'],
            'has_privilege' => [
                'privilege' => ['Read', 'Write'],
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Daily Scale Calibration Check'
            ],
            'start_date' => [
                'type' => 'datetime',
                'format' => 'Y-m-d'
            ],
            'end_date' => [
                'type' => 'datetime',
                'format' => 'Y-m-d'
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\calibration\getReportData'
    ],
    'log-gmp-packing-calibration' => [
        'requirements_desc' => [
            'logged_in' => ['Manager', 'Supervisor', 'Employee'],
            'has_privilege' => [
                'privilege' => ['Read', 'Write'],
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Daily Scale Calibration Check'
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\calibration\getSaclesOfZone'
    ],
    'capture-gmp-packing-calibration' => [
        'requirements_desc' => [
            'logged_in' => ['Employee'],
            'has_privilege' => [
                'privilege' => 'Write',
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Daily Scale Calibration Check'
            ],
            'date' => [
                'type' => 'datetime',
                'format' => 'Y-m-d'
            ],
            'notes' => [
                'type' => 'string',
                'max_length' => 80
            ],
            'corrective_action' => [
                'type' => 'string',
                'max_length' => 256
            ],
            'types' => [
                'type' => 'array',
                'values' => [
                    'id' => [
                        'type' => 'int',
                        'min' => 1
                    ],
                    'time' => [
                        'type' => 'datetime',
                        'format' => 'G:i'
                    ],
                    'items' => [
                        'type' => 'array',
                        'values' => [
                            'id' => [
                                'type' => 'int',
                                'min' => 1
                            ],
                            'test' => [
                                'type' => 'float'
                            ],
                            'status' => [
                                'type' => 'bool'
                            ],
                            'is_sanitized' => [
                                'type' => 'bool'
                            ]
                        ]
                    ]
                ]
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\calibration\registerLogEntry'
    ]
];


// Recieves a PDF file and stores it as the new manual for the Pre-Op log
function uploadManualFile($request)
{
    fsm\uploadManualFile('gmp', 'packing', 'calibration');
    return [];
}


// [***]
// Returns the scale calibration log entries captured in the given zone on
// the especified date interval for presentation in a report
function getReportData($request)
{
    // first, we connect to the data base
    $capturedLogs = new db\CapturedLogsDAO();
    $timeLogs = new cal\TimeLogsDAO();
    $users = new db\UsersDAO();

    // then, we get the captured logs' date info 
    $logDates = $capturedLogs->selectByDateIntervalLogIDAndZoneID(
        $request['start_date'],
        $request['end_date'],
        $logs->getIDByNames(
            'GMP', 'Packing', 'Daily Scale Calibration Check'
        ),
        $_SESSION['zone_id']
    );

    // if no logs where captured, throw an exception
    if (!isset($logDates)) {
        throw new \Exception('No logs where captured at that date.', 2);
    }

    // initialize the storage for the reports
    $reports = [];

    // visit each dated log that was obtained earlier
    foreach ($logDates as $logDate) {
        // select all the per scale type log data
        $logs = $timeLogs->selectByCaptureDateID($logDate['id']);

        // initialize the storage for the per scale type logs
        $scaleTypeLogs = [];

        $scaleLogs = [
            'id' => 0
        ];

        // visit each per scale log data to store it in a separate array
        foreach ($logs as $log) {
            // check if the scale type changed
            $hasTypeChanged = $scaleLogs['id'] != $log['type_id'];
            if ($hasTypeChanged) {
                // if the scale type changed, check if we already have log info.
                // waiting to be stored 
                if ($scaleLogs['id'] != 0) {
                    // if we do, store it in the final array
                    array_push($scaleTypeLogs, $scaleLogs);
                } 

                // create a new temporal storage for the logs of the current 
                // scale type
                $scaleLogs = [
                    'id' => $log['type_id'],
                    'name' => $log['type_name'],
                    'time' => $log['time'],
                    'items' => [[
                        'order' => $log['order'],
                        'name' => $log['scale_name'],
                        'test' => $log['status'],
                        'status' => $log['status'],
                        'is_sanitized' => $log['is_sanitized']
                    ]]
                ];
            } else {
                // if the scale type has not change, push the current log
                // data to the array of logs for the current scale type
                array_push($scaleLogs['items'], [
                    'order' => $log['order'],
                    'name' => $log['scale_name'],
                    'test' => $log['status'],
                    'status' => $log['status'],
                    'is_sanitized' => $log['is_sanitized']
                ]);
            }
        }

        // push the last entries to the final storage
        if ($scaleLogs['type_id'] != 0) {
            array_push($scaleTypeLogs, $scaleLogs);
        } 

        // push the resulting array of per scale type logs to the final report 
        // storage
        array_push($reports, [
            'report_id' => $logDate['id'],
            'created_by' => $users->getNameByID($logDate['employee_id']),
            'approved_by' => $users->getNameByID($logDate['supervisor_id']),
            'creation_date' => $logDate['capture_date'],
            'approval_date' => (isset($logDate['approval_date'])) ?
                $logDate['approval_date'] : 'N/A',
            'zone_name' => $_SESSION['zone_name'],
            'program_name' => 'GMP',
            'module_name' => 'Packing',
            'log_name' => 'Daily Scale Calibration Check',
            'notes' => $logDate['extra_info1'],
            'corrective_action' => $logDate['extra_info2'],
            'types' => $scaleTypeLogs
        ]);
    }
}


// [***]
// Returns an associative array that contains the list of scales that are 
// registered in the especified zone
function getScalesOfZone($request)
{
    // first, connect to the data base
    $scales = new cal\ScalesDAO();

    // then get the data from the table
    $rows = $scales->selectActiveByZoneID($_SESSION['zone_id']);

    // initialize the temporal storage for the list of scales 
    $scaleList = [];

    // initialize the temporal storage for the data of each scale
    $scaleData = [
        'id' => 0
    ];

    // visit each row that was read from the table
    foreach ($rows as $row) {
        // check if the scale type changed
        $hasTypeChanged = $scaleData['id'] != $row['type_id'];
        if ($hasTypeChanged) {
            // if the scale type changed, check if we already have scale info.
            // waiting to be stored 
            if ($scale['type_id'] != 0) {
                // if we do, store it in the final array
                array_push($scaleList, $scaleData);
            } 

            // create a new temporal storage for the logs of the current 
            // scale type
            $scaleData = [
                'id' => $log['type_id'],
                'name' => $log['type_name'],
                'items' => [[
                    'id' => $log['id'],
                    'name' => $log['scale_name'],
                    'order' => $log['order']
                ]]
            ];
        } else {
            // if the scale type has not change, push the current scale
            // data to the list of scales for the current scale type
            array_push($scaleData['items'], [
                'id' => $log['id'],
                'name' => $log['scale_name'],
                'order' => $log['order']
            ]);
        }
    }

    // push the last elements to the list of scales
    if ($scale['type_id'] != 0) {
        array_push($scaleList, $scaleData);
    }    

    return [
        'zone_name' => $_SESSION['zone_name'],
        'program_name' => 'GMP',
        'module_name' => 'Packing',
        'log_name' => 'Daily Scale Calibration Check',
        'types' => $scaleList
    ];
}


// Adds a new entry to the calibration log
function registerLogEntry($request)
{
    // first, connect to the data base
    $logDate = new db\CapturedLogsDAO();
    $timeLogs = new cal\TimeLogsDAO();
    $scaleLogs = new cal\ScaleLogsDAO();
    $logs = new db\LogsDAO();

    // get the ID of the log that we are working with
    $logID = $logs->getIDByNames(
        'GMP', 'Packing', 'Daily Scale Calibration Check'
    );

    // insert the capture date and the ID of the reportee user
    $logID = $logDate->insert([
        'employee_id' => $_SESSION['user_id'],
        'log_id' => $logID,
        'capture_date' => $request['date'],
        'extra_info1' => $request['notes'],
        'extra_info2' => $request['corrective_action']
    ]);

    // create temporal storage for the many entries to be inserted in the per 
    // scale log
    $scaleLogEntries = [];

    // visit each per scale type log data
    foreach ($request['types'] as $log) {
        // store the time info in the data base
        $timeID = $timeLogs->insert([
            'capture_date_id' => $logID,
            'time' => $log['time']
        ]);

        // then visit each per scale log data
        foreach ($log['items'] as $scaleLog) {
            // push the log data to the temporal storage
            array_push($scaleLogEntries, [
                'time_log_id' => $timeID,
                'scale_id' => $scaleLog['id'],
                'test' => $scaleLog['test'],
                'was_scale_sanitized' => $scaleLog['is_sanitized'],
                'was_test_passed' => $scaleLog['status']
            ]);
        }
    }

    // insert the resulting array of per scale log data to the data base
    $scaleLogs->insert($scaleLogEntries);
}

?>
<?php

namespace fsm\services\gmp\packing\calibration;

require_once realpath(dirname(__FILE__).'/../../../globals.php');

use fsm;


$gmpPackingCalServices = [
    'upload-manual-gmp-packing-scale-calibration' => [
        'requirements_desc' => [
            'logged_in' => ['Director', 'Manager', 'Supervisor'],
            'has_privileges' => [
                'privilege' => 'Read',
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Daily Scale Calibration Check'
            ],
            'files' => [
                'name' => 'manual_file',
                'format' => 'document'
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\calibration\uploadManualFile'
    ],
    'report-gmp-packing-scale-calibration' => [
        'requirements_desc' => [
            'logged_in' => ['Director', 'Manager', 'Supervisor', 'Employee'],
            'has_privileges' => [
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
    'log-gmp-packing-scale-calibration' => [
        'requirements_desc' => [
            'logged_in' => ['Manager', 'Supervisor', 'Employee'],
            'has_privileges' => [
                'privilege' => ['Read', 'Write'],
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Daily Scale Calibration Check'
            ]
        ],
        'callback' => 
            'fsm\services\gmp\packing\calibration\getActiveScalesOfZone'
    ],
    'capture-gmp-packing-scale-calibration' => [
        'requirements_desc' => [
            'logged_in' => ['Employee'],
            'has_privileges' => [
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
                'max_length' => 256,
                'optional' => true
            ],
            'corrective_action' => [
                'type' => 'string',
                'max_length' => 256,
                'optional' => true
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
    ],
    'get-scales-of-zone' => [
        'requirements_desc' => [
            'logged_in' => ['Supervisor'],
            'has_privileges' => [
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Daily Scale Calibration Check',
                'privilege' => 'Read'
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\calibration\getScalesOfZone'
    ],
    'toggle-scale-activation' => [
        'requirements_desc' => [
            'logged_in' => ['Supervisor'],
            'has_privileges' => [
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Daily Scale Calibration Check',
                'privilege' => 'Read'
            ],
            'scale_id' => [
                'type' => 'int',
                'min' => 1
            ]
        ],
        'callback' => 
            'fsm\services\gmp\packing\calibration\toggleActivationOfScale'
    ],
    'change-order-of-scale' => [
        'requirements_desc' => [
            'logged_in' => ['Supervisor'],
            'has_privileges' => [
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Daily Scale Calibration Check',
                'privilege' => 'Read'
            ],
            'scale_id' => [
                'type' => 'int',
                'min' => 1
            ],
            'position' => [
                'type' => 'int'
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\calibration\changeScalePosition'
    ],
    'add-new-scale' => [
        'requirements_desc' => [
            'logged_in' => ['Supervisor'],
            'has_privileges' => [
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Daily Scale Calibration Check',
                'privilege' => 'Read'
            ],
            'zone_id' => [
                'type' => 'int',
                'min' => 1
            ],
            'type_id' => [
                'type' => 'int',
                'min' => 1
            ],
            'scale_name' => [
                'type' => 'string',
                'min_length' => 1,
                'max_length' => 32
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\calibration\addNewScale'
    ]
];


// Recieves a PDF file and stores it as the new manual for the Pre-Op log
function uploadManualFile($scope, $request)
{
    fsm\uploadManualFile('gmp', 'packing', 'calibration');
}


// [***]
// Returns the scale calibration log entries captured in the given zone on
// the especified date interval for presentation in a report
function getReportData($scope, $request)
{
    // first, we get the session segment
    $segment = $scope->session->getSegment('fsm');

    // then, we get the captured logs' date info 
    $logDates = $scope->capturedLogs->selectByDateIntervalLogIDAndZoneID(
        $request['start_date'],
        $request['end_date'],
        $scope->logs->getIDByNames(
            'GMP', 'Packing', 'Daily Scale Calibration Check'
        ),
        $segment->get('zone_id')
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
        $logs = $scope->timeLogs->selectByCaptureDateID($logDate['id']);

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
                        'test' => $log['test'],
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
                    'test' => $log['test'],
                    'status' => $log['status'],
                    'is_sanitized' => $log['is_sanitized']
                ]);
            }
        }

        // push the last entries to the final storage
        if ($scaleLogs['id'] != 0) {
            array_push($scaleTypeLogs, $scaleLogs);
        } 

        $supervisor = $scope->users->getNameByID($logDate['supervisor_id']);
        $employee = $scope->users->getNameByID($logDate['employee_id']);

        // push the resulting array of per scale type logs to the final report 
        // storage
        array_push($reports, [
            'report_id' => $logDate['id'],
            'created_by' => $employee['first_name'].' '.$employee['last_name'],
            'approved_by' => (isset($supervisor['first_name'])) ?
                $supervisor['first_name'].' '.$supervisor['last_name'] : 'N/A',
            'creation_date' => $logDate['capture_date'],
            'approval_date' => (isset($logDate['approval_date'])) ?
                $logDate['approval_date'] : 'N/A',
            'zone_name' => $segment->get('zone_name'),
            'program_name' => 'GMP',
            'module_name' => 'Packing',
            'log_name' => 'Daily Scale Calibration Check',
            'notes' => $logDate['extra_info1'],
            'corrective_action' => $logDate['extra_info2'],
            'types' => $scaleTypeLogs
        ]);
    }

    return $reports;
}


// [***]
// Returns an associative array that contains the list of scales that are 
// registered in the especified zone
function getActiveScalesOfZone($scope, $request)
{
    // first, we get the session segment
    $segment = $scope->session->getSegment('fsm');

    // then get the data from the table
    $rows = $scope->scales->selectActiveByZoneID($segment->get('zone_id'));

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
            if ($scaleData['id'] != 0) {
                // if we do, store it in the final array
                array_push($scaleList, $scaleData);
            } 

            // create a new temporal storage for the logs of the current 
            // scale type
            $scaleData = [
                'id' => $row['type_id'],
                'name' => $row['type_name'],
                'items' => [[
                    'id' => $row['id'],
                    'name' => $row['name'],
                    'order' => $row['order']
                ]]
            ];
        } else {
            // if the scale type has not change, push the current scale
            // data to the list of scales for the current scale type
            array_push($scaleData['items'], [
                'id' => $row['id'],
                'name' => $row['name'],
                'order' => $row['order']
            ]);
        }
    }

    // push the last elements to the list of scales
    if ($scaleData['id'] != 0) {
        array_push($scaleList, $scaleData);
    }    

    return [
        'zone_name' => $segment->get('zone_name'),
        'program_name' => 'GMP',
        'module_name' => 'Packing',
        'log_name' => 'Daily Scale Calibration Check',
        'types' => $scaleList
    ];
}


// Adds a new entry to the calibration log
function registerLogEntry($scope, $request)
{
    // first, we get the session segment
    $segment = $scope->session->getSegment('fsm');

    // get the ID of the log that we are working with
    $logID = $scope->logs->getIDByNames(
        'GMP', 'Packing', 'Daily Scale Calibration Check'
    );

    // insert the capture date and the ID of the reportee user
    $logID = $scope->capturedLogs->insert([
        'employee_id' => $segment->get('user_id'),
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
        $timeID = $scope->timeLogs->insert([
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
    $scope->scaleLogs->insert($scaleLogEntries);
}


// [***]
// Returns a list of all the scales registred in the especified zone
function getScalesOfZone($scope, $request)
{
    // first, we get the session segment
    $segment = $scope->session->getSegment('fsm');

    // then get all the scale types
    $scaleTypes = $scope->scaleTypes->selectAll();

    // initialize the temporal storage for the list of scales 
    $scaleList = [];

    // visit each scale type
    foreach ($scaleTypes as $type) {
        // retrieve the scales of the especified type and zone
        $scales = $scope->scales->selectByZoneAndTypeID(
            $segment->get('zone_id'), $type['id']
        );

        // store the scales on the final array
        array_push($scaleList, [
            'id' => $type['id'],
            'name' => $type['name'],
            'items' => $scales
        ]);
    }

    // return the resulting scale list
    return $scaleList;
}


// Toggles the activation fo the especified scale on or off
function toggleActivationOfScale($scope, $request)
{
    $scope->scales->toggleActivationByID($request['scale_id']);
}


// Changes the position of the specified scale
function changeScalePosition($scope, $request)
{
    $scope->scales->updatePositionByID($request['scale_id'], 
        $request['position']);
}


// Adds a new scale to the specified zone
function addNewScale($scope, $request) 
{
    // first we get the session segment
    $segment = $scope->session->getSegment('fsm');
    $zoneID = $segment->get('zone_id');

    // count the number of scales in this zone
    // so we can compute the position of this scale and add it
    // in the last position
    $numScalesInZone = $scope->scales->countByZoneAndTypeIDs(
        $zoneID,
        $request['type_id']
    );

    // store the item in the data base 
    return $scope->scales->insert([
        'is_active' => TRUE,
        'zone_id' => $zoneID,
        'type_id' => $request['type_id'],
        'position' => $numScalesInZone + 1,
        'serial_num' => $request['scale_name']
    ]);
}

?>
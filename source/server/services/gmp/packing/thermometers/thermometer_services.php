<?php

namespace fsm\services\gmp\packing\thermometers;

require_once realpath(dirname(__FILE__).'/../../../globals.php');

use fsm;

$gmpPackingThermoServices = [
    'upload-manual-gmp-packing-thermo-calibration' => [
        'requirements_desc' => [
            'logged_in' => ['Director', 'Manager', 'Supervisor'],
            'has_privileges' => [
                'privilege' => 'Read',
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Daily Thermometer Calibration Verification Check'
            ],
            'files' => [
                'name' => 'manual_file',
                'format' => 'document'
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\thermometers\uploadManualFile'
    ],
    'log-gmp-packing-thermo-calibration' => [
        'requirements_desc' => [
            'logged_in' => ['Manager', 'Supervisor', 'Employee'],
            'has_privileges' => [
                'privilege' => ['Read', 'Write'],
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Daily Thermometer Calibration Verification Check'
            ]
        ], 
        'callback' => 
            'fsm\services\gmp\packing\thermometers\getActiveThermometers'
    ],
    'capture-gmp-packing-thermo-calibration' => [
        'requirements_desc' => [
            'logged_in' => ['Employee'],
            'has_privileges' => [
                'privilege' => 'Write',
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Daily Thermometer Calibration Verification Check'
            ],
            'date' => [
                'type' => 'datetime',
                'format' => 'Y-m-d'
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
                    'calibration' => [
                        'type' => 'bool'
                    ],
                    'deficiencies' => [
                        'type' => 'string',
                        'max_length' => 256,
                        'optional' => true
                    ],
                    'corrective_action' => [
                        'type' => 'string',
                        'max_length' => 256,
                        'optional' => true
                    ]
                ]
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\thermometers\registerLogEntry'
    ],
    'report-gmp-packing-thermo-calibration' => [
        'requirements_desc' => [
            'logged_in' => ['Director', 'Manager', 'Supervisor', 'Employee'],
            'has_privileges' => [
                'privilege' => ['Read', 'Write'],
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Daily Thermometer Calibration Verification Check'
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
        'callback' => 'fsm\services\gmp\packing\thermometers\getReportData'
    ]
];


// Recieves a PDF file and stores it as the new manual for the scissors & knives
// log
function uploadManualFile($scope, $request)
{
    fsm\uploadManualFile('gmp', 'packing', 'thermometers');
}


// Returns the list of thermometers that are still active
function getActiveThermometers($scope, $request)
{
    // first, get the session segment
    $segment = $scope->session->getSegment('fsm');

    // retrieve the list of thermometers from the database
    $thermos = 
        $scope->thermometers->selectActiveByZoneID($segment->get('zone_id'));

    // prepare the response JSON
    return [
        'zone_name' => $segment->get('zone_name'),
        'program_name' => 'GMP',
        'module_name' => 'Packing',
        'log_name' => 'Daily Thermometer Calibration Verification Check',
        'items' => $thermos
    ];
}


// Saves a new log entry to the database
function registerLogEntry($scope, $request)
{
    // first, we get the session segment
    $segment = $scope->session->getSegment('fsm');

    // get the ID of the log that we are working with
    $logID = $scope->logs->getIDByNames(
        'GMP', 'Packing', 'Daily Thermometer Calibration Verification Check'
    );

    // insert the capture date and the ID of the reportee user
    $logID = $scope->capturedLogs->insert([
        'employee_id' => $segment->get('user_id'),
        'log_id' => $logID,
        'capture_date' => $request['date'],
        'extra_info1' => $request['time'],
        'extra_info2' => NULL
    ]);

    // initialize the array of rows to be inserted to the database
    $rows = [];

    // then visit each thermometer
    foreach ($request['items'] as $item) {
        // check if the thermometer has corrective actions
        $hasCorrectiveAction = 
            isset($item['corrective_action']) 
            && array_key_exists('corrective_action', $item);

        // store the thermometer info to the array of rows
        array_push($rows, [
            'capture_date_id' => $logID,
            'thermometer_id' => $item['id'],
            'test' => $item['test'],
            'was_test_passed' => $item['calibration'],
            'deficiencies' => $item['deficiencies'],
            'corrective_actions' => ($hasCorrectiveAction) ?
                $item['corrective_action'] : ''
        ]);
    }

    // finally insert the rows to the database
    $scope->thermoLogs->insert($rows);
}


// Returns the report data for this log on the specified date interval
function getReportData($scope, $request)
{
    // first, we get the session segment
    $segment = $scope->session->getSegment('fsm');

    // then, we get the captured logs' date info 
    $logDates = $scope->capturedLogs->selectByDateIntervalLogIDAndZoneID(
        $request['start_date'],
        $request['end_date'],
        $scope->logs->getIDByNames(
            'GMP', 'Packing', 'Daily Thermometer Calibration Verification Check'
        ),
        $segment->get('zone_id')
    );

    // if no logs where captured, throw an exception
    if (!isset($logDates)) {
        throw new \Exception('No logs where captured at that date.', 2);
    }

    // initialize the storage for the reports
    $reports = [];

    // visit each date log that was obtained earlier
    foreach ($logDates as $logDate) {
        // retrieve the per group log corresponding to this date
        $items = $scope->thermoLogs->selectByCaptureDateID($logDate['id']);

        // then retrieve the name of the employee and supervisor that worked on 
        // this log
        $supervisor = $scope->users->getNameByID($logDate['supervisor_id']);
        $employee = $scope->users->getNameByID($logDate['employee_id']);
        
        // push the report data to the array
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
            'log_name' => 'Daily Thermometer Calibration Verification Check',
            'time' => $logDate['extra_info1'],
            'items' => $items
        ]); 
    }

    // finally return the list of reports
    return $reports;
}

?>
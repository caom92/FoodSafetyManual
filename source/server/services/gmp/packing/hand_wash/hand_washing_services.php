<?php

namespace fsm\services\gmp\packing\handWash;

require_once realpath(dirname(__FILE__).'/../../../globals.php');

use fsm;

$gmpPackingHandWashServices = [
    'upload-manual-gmp-packing-hand-washing' => [
        'requirements_desc' => [
            'logged_in' => ['Director', 'Manager', 'Supervisor'],
            'has_privileges' => [
                'privilege' => 'Read',
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Daily Hand Washing Inspection'
            ],
            'files' => [
                'name' => 'manual_file',
                'format' => 'document'
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\handWash\uploadManualFile'
    ],
    'add-item-gmp-packing-hand-washing' => [
        'requirements_desc' => [
            'logged_in' => ['Supervisor'],
            'has_privileges' => [
                'privilege' => 'Read',
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Daily Hand Washing Inspection'
            ],
            'name' => [
                'type' => 'string'
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\handWash\addCharacteristic'
    ],
    'toggle-gmp-packing-hand-washing' => [
        'requirements_desc' => [
            'logged_in' => ['Supervisor'],
            'has_privileges' => [
                'privilege' => 'Read',
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Daily Hand Washing Inspection'
            ],
            'id' => [
                'type' => 'int',
                'min' => 1
            ]
        ],
        'callback' => 
            'fsm\services\gmp\packing\handWash\toggleCharacteristicActivation'
    ],
    'inventory-gmp-packing-hand-washing' => [
        'requirements_desc' => [
            'logged_in' => ['Supervisor'],
            'has_privileges' => [
                'privilege' => 'Read',
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Daily Hand Washing Inspection'
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\handWash\getAllCharacteristics'
    ],
    'log-gmp-packing-hand-washing' => [
        'requirements_desc' => [
            'logged_in' => ['Manager', 'Supervisor', 'Employee'],
            'has_privileges' => [
                'privilege' => ['Read', 'Write'],
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Daily Hand Washing Inspection'
            ]
        ], 
        'callback' => 
            'fsm\services\gmp\packing\handWash\getActiveCharacteristics'
    ],
    'report-gmp-packing-hand-washing' => [
        'requirements_desc' => [
            'logged_in' => ['Director', 'Manager', 'Supervisor', 'Employee'],
            'has_privileges' => [
                'privilege' => ['Read', 'Write'],
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Daily Hand Washing Inspection'
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
        'callback' => 'fsm\services\gmp\packing\handWash\getReportData'
    ],
    'capture-gmp-packing-hand-washing' => [
        'requirements_desc' => [
            'logged_in' => ['Employee'],
            'has_privileges' => [
                'privilege' => 'Write',
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Daily Hand Washing Inspection'
            ],
            'date' => [
                'type' => 'datetime',
                'format' => 'Y-m-d'
            ],
            'notes' => [
                'type' => 'string',
                'max_length' => 256
            ],
            'items' => [
                'type' => 'array',
                'values' => [
                    'id' => [
                        'type' => 'int',
                        'min' => 1
                    ],
                    'is_acceptable' => [
                        'type' => 'bool'
                    ]
                ]
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\handWash\registerLogEntry'
    ]
];


// Recieves a PDF file and stores it as the new manual for the hand washing log
function uploadManualFile($scope, $request)
{
    fsm\uploadManualFile('gmp', 'packing', 'hand_wash');
}


// Adds a new hand washing characteristic with the especified to the database 
function addCharacteristic($scope, $request)
{
    // first we get the session segment
    $segment = $scope->session->getSegment('fsm');

    // store the item in the data base 
    return $scope->handWashCharacteristics->insert([
        'zone_id' => $segment->get('zone_id'),
        'is_active' => TRUE,
        'name' => $request['name']
    ]);
}


// Toggles the activation status of a characteristic with the especified ID
function toggleCharacteristicActivation($scope, $request)
{
    $scope->handWashCharacteristics->toggleActivationByID($request['id']);
}


// Retrieve a list of all the characteristics in the database
function getAllCharacteristics($scope, $request)
{
    // first, we get the session segment
    $segment = $scope->session->getSegment('fsm');

    // retrieve the list of groups from the database
    return $scope->handWashCharacteristics->selectAllByZoneID($segment->get('zone_id'));
}


// Returns the list of characteristics that are still active
function getActiveCharacteristics($scope, $request)
{
    // first, get the session segment
    $segment = $scope->session->getSegment('fsm');

    // retrieve the list of thermometers from the database
    $characteristics = 
        $scope->handWashCharacteristics->selectActiveByZoneID($segment->get('zone_id'));

    // prepare the response JSON
    return [
        'zone_name' => $segment->get('zone_name'),
        'program_name' => 'GMP',
        'module_name' => 'Packing',
        'log_name' => 'Daily Hand Washing Inspection',
        'items' => $characteristics
    ];
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
            'GMP', 'Packing', 'Daily Hand Washing Inspection'
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
        // retrieve the per characteristic log corresponding to this date
        $items = $scope->handWashLogs->selectByCaptureDateID($logDate['id']);

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
            'log_name' => 'Daily Hand Washing Inspection',
            'notes' => $logDate['extra_info1'],
            'items' => $items
        ]); 
    }

    // finally return the list of reports
    return $reports;
}


// Saves a new log entry to the database
function registerLogEntry($scope, $request)
{
    // first, we get the session segment
    $segment = $scope->session->getSegment('fsm');

    // get the ID of the log that we are working with
    $logID = $scope->logs->getIDByNames(
        'GMP', 'Packing', 'Daily Hand Washing Inspection'
    );

    // insert the capture date and the ID of the reportee user
    $logID = $scope->capturedLogs->insert([
        'employee_id' => $segment->get('user_id'),
        'log_id' => $logID,
        'capture_date' => $request['date'],
        'extra_info1' => $request['notes'],
        'extra_info2' => NULL
    ]);

    // initialize the array of rows to be inserted to the database
    $rows = [];

    // then visit each thermometer
    foreach ($request['items'] as $item) {
        // store the characteristic info to the array of rows
        array_push($rows, [
            'capture_date_id' => $logID,
            'characteristic_id' => $item['id'],
            'is_acceptable' => $item['is_acceptable']
        ]);
    }

    // finally insert the rows to the database
    $scope->handWashLogs->insert($rows);
}

?>
<?php

namespace fsm\services\gmp\packing\atp;

require_once realpath(dirname(__FILE__).'/../../../globals.php');

use fsm;


$gmpPackingATPServices = [
    'log-gmp-packing-atp-testing' => [
        'requirements_desc' => [
            'logged_in' => ['Manager', 'Supervisor', 'Employee'],
            'has_privileges' => [
                'privilege' => ['Read', 'Write'],
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Environmental ATP Testing'
            ]
        ],
        'callback' => 
            'fsm\services\gmp\packing\atp\getLogInfo'
    ],
    'capture-gmp-packing-atp-testing' => [
        'requirements_desc' => [
            'logged_in' => ['Employee'],
            'has_privileges' => [
                'privilege' => 'Write',
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Environmental ATP Testing'
            ],
            'date' => [
                'type' => 'datetime',
                'format' => 'Y-m-d'
            ],
            'areas' => [
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
                            'test_number' => [
                                'type' => 'int',
                                'min' => 1
                            ],
                            'test1' => [
                                'type' => 'float'
                            ],
                            'results1' => [
                                'type' => 'bool'
                            ],
                            'corrective_action' => [
                                'type' => 'string',
                                'max_length' => 256,
                                'optional' => true
                            ],
                            'test2' => [
                                'type' => 'float',
                                'optional' => true
                            ],
                            'results2' => [
                                'type' => 'bool',
                                'optional' => true
                            ]
                        ]
                    ]
                ]
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\atp\registerLogEntry'
    ],
    'report-gmp-packing-atp-testing' => [
        'requirements_desc' => [
            'logged_in' => ['Director', 'Manager', 'Supervisor', 'Employee'],
            'has_privileges' => [
                'privilege' => ['Read', 'Write'],
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Environmental ATP Testing'
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
        'callback' => 'fsm\services\gmp\packing\atp\getReportData'
    ],
    'upload-manual-gmp-packing-atp-testing' => [
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
        'callback' => 'fsm\services\gmp\packing\atp\uploadManualFile'
    ]
];


// Recieves a PDF file and stores it as the new manual for the ATP log
function uploadManualFile($scope, $request)
{
    fsm\uploadManualFile('gmp', 'packing', 'atp');
}


// Returns the required data for creating the log form
function getLogInfo($scope, $request)
{
    $segment = $scope->session->getSegment('fsm');
    return [
        'zone_name' => $segment->get('zone_name'),
        'program_name' => 'GMP',
        'module_name' => 'Environmental ATP Testing'
    ];
}


// Adds a new entry to the calibration log
function registerLogEntry($scope, $request)
{
    // first, we get the session segment
    $segment = $scope->session->getSegment('fsm');

    // get the ID of the log that we are working with
    $logID = $scope->logs->getIDByNames(
        'GMP', 'Packing', 'Environmental ATP Testing'
    );

    // insert the capture date and the ID of the reportee user
    $logID = $scope->capturedLogs->insert([
        'employee_id' => $segment->get('user_id'),
        'log_id' => $logID,
        'capture_date' => $request['date'],
        'extra_info1' => NULL,
        'extra_info2' => NULL
    ]);

    // then visit each area element
    foreach ($request['areas'] as $area) {
        // store in the database the area and time
        $timeLogID = $scope->atpTimeLogs->insert([
            'capture_date_id' => $logID,
            'area_id' => $area['id'],
            'time' => $area['time']
        ]);

        // initialize the array for inserting the per-area items
        $items = [];

        // then visit each per-area item
        foreach ($area['items'] as $item) {
            // check if a 2nd test was performed
            $hasCorrectiveAction = 
                isset($item['corrective_action'])
                && array_key_exists('corrective_action', $item);
            $hasTest = 
                isset($item['test2'])
                && array_key_exists('test2', $item);
            $hasStatus = 
                isset($item['results2'])
                && array_key_exists('results2', $item);
            
            // push the item data to the items storage
            array_push($items, [
                'time_log_id' => $timeLogID,
                'test_num' => $item['test_number'],
                'test1' => $item['test1'],
                'was_test1_passed' => $item['results1'],
                'corrective_action' => ($hasCorrectiveAction) ?
                    $item['corrective_action'] : NULL,
                'test2' => ($hasTest) ? $item['test2'] : NULL,
                'was_test2_passed' => ($hasStatus) ? $item['results2'] : NULL 
            ]);
        }

        // store the items to the database
        $scope->atpLogs->insert($items);
    }
}


// Returns the atp testing log entries captured in the given zone on
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
            'GMP', 'Packing', 'Environmental ATP Testing'
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
        // get the areas corresponding to this log date
        $areaLogs = $scope->atpTimeLogs->selectByCaptureDateID($logDate['id']);

        // initialize the array of per-area info
        $areas = [];

        // visit each per area log info
        foreach ($areaLogs as $area) {
            // retrieve the data of all the items registered to this area
            $items = $scope->atpLogs->selectByTimeLogID($area['time_log_id']);

            // push the complete area data to the final storage
            array_push($areas, [
                'name' => $area['name'],
                'time' => $area['time'],
                'items' => $items
            ]);
        }

        // retrieve the employee and supervisor's data
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
            'log_name' => 'Environmental ATP Testing',
            'areas' => $areas
        ]);
    }

    return $reports;
}

?>
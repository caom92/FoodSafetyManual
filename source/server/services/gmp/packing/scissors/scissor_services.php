<?php

namespace fsm\services\gmp\packing\scissors;

require_once realpath(dirname(__FILE__).'/../../../globals.php');

use fsm;

$gmpPackingScissorServices = [
    'log-gmp-packing-scissors-knives' => [
        'requirements_desc' => [
            'logged_in' => ['Manager', 'Supervisor', 'Employee'],
            'has_privileges' => [
                'privilege' => ['Read', 'Write'],
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Daily Scissors & Knives Inspection'
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\scissors\getActiveGroups'
    ],
    'capture-gmp-packing-scissors-knives' => [
        'requirements_desc' => [
            'logged_in' => ['Employee'],
            'has_privileges' => [
                'privilege' => 'Write',
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Daily Scissors & Knives Inspection'
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
            'items' => [
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
                    'approved' => [
                        'type' => 'bool'
                    ],
                    'condition' => [
                        'type' => 'bool'
                    ],
                    'is_sanitized' => [
                        'type' => 'bool'
                    ],
                    'corrective_action' => [
                        'type' => 'string',
                        'max_length' => 256,
                        'optional' => true
                    ]
                ]
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\scissors\registerLogEntry'
    ],
    'report-gmp-packing-scissors-knives' => [
        'requirements_desc' => [
            'logged_in' => ['Director', 'Manager', 'Supervisor', 'Employee'],
            'has_privileges' => [
                'privilege' => ['Read', 'Write'],
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Daily Scissors & Knives Inspection'
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
        'callback' => 'fsm\services\gmp\packing\scissors\getReportData'
    ]
];


// Returns the list of knives and scissors groups that are still valid
function getActiveGroups($scope, $request)
{
    // first, get the session segment
    $segment = $scope->session->getSegment('fsm');

    // retrieve the list of knife groups from the database
    $groups = 
        $scope->knifeGroups->selectActiveByZoneID($segment->get('zone_id'));

    // prepare the response JSON
    return [
        'zone_name' => $segment->get('zone_name'),
        'program_name' => 'GMP',
        'module_name' => 'Packing',
        'log_name' => 'Daily Scissors & Knives Inspection',
        'items' => $groups
    ];
}


// Saves a new log entry to the database
function registerLogEntry($scope, $request)
{
    // first, we get the session segment
    $segment = $scope->session->getSegment('fsm');

    // get the ID of the log that we are working with
    $logID = $scope->logs->getIDByNames(
        'GMP', 'Packing', 'Daily Scissors & Knives Inspection'
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

    // then visit each group
    foreach ($request['items'] as $group) {
        // check if the group has corrective actions
        $hasCorrectiveAction = 
            isset($group['corrective_action']) 
            && array_key_exists('corrective_action', $group);

        // store the group info to the array of rows
        array_push($rows, [
            'capture_date_id' => $logID,
            'time' => $group['time'],
            'group_id' => $group['id'],
            'was_approved' => $group['approved'],
            'was_returned' => $group['condition'],
            'was_sanitized' => $group['is_sanitized'],
            'corrective_actions' => ($hasCorrectiveAction) ?
                $group['corrective_action'] : NULL
        ]);
    }

    // finally insert the rows to the database
    $scope->scissorLogs->insert($rows);
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
            'GMP', 'Packing', 'Daily Scissors & Knives Inspection'
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
        $groups = $scope->scissorLogs->selectByCaptureDateID($logDate['id']);

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
            'log_name' => 'Daily Scissors & Knives Inspection',
            'notes' => $logDate['extra_info1'],
            'items' => $groups
        ]); 
    }

    // finally return the list of reports
    return $reports;
}

?>
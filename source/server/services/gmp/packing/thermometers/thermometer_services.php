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
            'fsm\service\gmp\packing\thermometers\getActiveThermometers'
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

?>
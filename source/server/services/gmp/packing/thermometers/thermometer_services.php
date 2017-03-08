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

?>
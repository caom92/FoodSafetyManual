<?php

namespace fsm\services\gmp\packing\thermometers;

require_once realpath(dirname(__FILE__).'/../../../globals.php');

use fsm;

$gmpPackingThermoServices = [
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
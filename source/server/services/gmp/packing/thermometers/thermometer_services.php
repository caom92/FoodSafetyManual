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

?>
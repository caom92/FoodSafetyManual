<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = fsm\createUpdateService(
  'GMP',
  'Packing',
  'Daily Thermometer Calibration Verification Check',
  [
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
  [
    'extra_info' => [
      'time',
    ],
    'function' => function($scope, $request) {
      $logs = $scope->daoFactory->get('gmp\packing\thermometer\Logs');
      foreach ($request['items'] as $thermometer) {
        $logs->updateByCapturedLogIDAndThermometerID(
          [
            'test' => $thermometer['test'],
            'was_test_passed' => $thermometer['calibration'],
            'deficiencies' => $thermometer['deficiencies'],
            'corrective_actions' => $thermometer['corrective_action']
          ],
          $request['report_id'],
          $thermometer['id']
        );
      }
    }
  ]
);

?>
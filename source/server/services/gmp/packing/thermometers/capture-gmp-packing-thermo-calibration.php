<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = fsm\createCaptureService(
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
    'function' => function($scope, $segment, $request, $logID) {
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
      return $scope->daoFactory->get('gmp\packing\thermometers\Logs')
        ->insert($rows);
    }
  ]
);

?>
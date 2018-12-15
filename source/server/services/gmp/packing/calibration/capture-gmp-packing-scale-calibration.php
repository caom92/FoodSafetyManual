<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createCaptureService(
  'GMP',
  'Packing',
  'Daily Equipment Calibration Check',
  [
    'notes' => [
      'type' => 'string',
      'max_length' => 65535,
      'optional' => true
    ],
    'corrective_action' => [
      'type' => 'string',
      'max_length' => 65535,
      'optional' => true
    ],
    'types' => [
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
            'id' => [
              'type' => 'int',
              'min' => 1
            ],
            'test' => [
              'type' => 'float'
            ],
            'unit_id' => [
              'type' => 'int',
              'min' => 1,
              'optional' => true
            ],
            'quantity' => [
              'type' => 'int',
              'optional' => true
            ],
            'status' => [
              'type' => 'bool'
            ],
            'is_sanitized' => [
              'type' => 'bool'
            ]
          ]
        ]
      ]
    ]
  ],
  [
    'extra_info' => [
      'notes',
      'corrective_action'
    ],
    'function' => function($scope, $segment, $request, $logID) {
      // create temporal storage for the many entries to be inserted in the per 
      // scale log
      $scaleLogEntries = [];

      // visit each per scale type log data
      foreach ($request['types'] as $log) {
        // store the time info in the data base
        $timeID = $scope->daoFactory->get('gmp\packing\calibration\TimeLogs')
          ->insert([
            'capture_date_id' => $logID,
            'time' => $log['time']
          ]);

        // then visit each per scale log data
        foreach ($log['items'] as $scaleLog) {
          // push the log data to the temporal storage
          array_push($scaleLogEntries, [
            'time_log_id' => $timeID,
            'scale_id' => $scaleLog['id'],
            'test' => $scaleLog['test'],
            'unit_id' => (isset($scaleLog['unit_id']) && array_key_exists('unit_id', $scaleLog)) ?
              $scaleLog['unit_id'] : NULL,
            'quantity' => (isset($scaleLog['quantity']) && array_key_exists('quantity', $scaleLog)) ?
              $scaleLog['quantity'] : NULL,
            'was_scale_sanitized' => $scaleLog['is_sanitized'],
            'was_test_passed' => $scaleLog['status']
          ]);
        }
      }

      // insert the resulting array of per scale log data to the data base
      return $scope->daoFactory->get('gmp\packing\calibration\ScaleLogs')
        ->insert($scaleLogEntries);
    }
  ]
);

?>
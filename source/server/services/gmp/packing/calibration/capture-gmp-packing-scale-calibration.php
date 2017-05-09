<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = fsm\createCaptureService(
  'GMP',
  'Packing',
  'Daily Scale Calibration Check',
  [
    'date' => [
      'type' => 'datetime',
      'format' => 'Y-m-d'
    ],
    'notes' => [
      'type' => 'string',
      'max_length' => 256,
      'optional' => true
    ],
    'corrective_action' => [
      'type' => 'string',
      'max_length' => 256,
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
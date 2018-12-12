<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUpdateService(
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
              'min' => 1
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
    'function' => function($scope, $request) {
      foreach ($request['types'] as $scaleType) {
        $scope->daoFactory->get('gmp\packing\calibration\TimeLogs')
          ->updateByCaptureDateID(
            [
              'time' => $scaleType['time']
            ],
            $request['report_id']
          );

        foreach ($scaleType['items'] as $item) {
          $scope->daoFactory->get('gmp\packing\calibration\ScaleLogs')
            ->updateByCapturedLogIDAndScaleID(
              [
                'test' => $item['test'],
                'unit_id' => $item['unit_id'],
                'quantity' => (isset($item['quantity']) && array_key_exists('quantity', $item)) ?
                  $item['quantity'] : NULL,
                'was_test_passed' => $item['status'],
                'was_scale_sanitized' => $item['is_sanitized']
              ],
              $request['report_id'],
              $item['id']
            );
        }
      }
    }
  ]
);

?>
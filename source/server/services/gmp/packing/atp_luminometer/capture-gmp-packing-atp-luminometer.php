<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createCaptureService(
  'GMP',
  'Packing',
  'ATP SystemSURE Luminometer',
  [
    'items' => [
      'type' => 'array',
      'values' => [
        'id' => [
          'type' => 'int',
          'min' => 1
        ],
        'weeks' => [
          'type' => 'array',
          'values' => [
            'week_num' => [
              'type' => 'int',
              'min' => 1
            ],
            'date' => [
              'type' => 'datetime',
              'format' => 'Y-m-d'
            ],
            'types' => [
              'type' => 'array',
              'values' => [
                'id' => [
                  'type' => 'int',
                  'min' => 1
                ],
                'tests' => [
                  'type' => 'array',
                  'values' => [
                    'test_num' => [
                      'type' => 'int',
                      'min' => 1
                    ],
                    'reading' => [
                      'type' => 'int',
                      'min' => 1,
                      'optional' => TRUE
                    ],
                    'notes' => [
                      'type' => 'string',
                      'max_length' => 65535,
                      'optional' => TRUE
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    ]
  ],
  [
    'extra_info' => [
      NULL
    ],
    'function' => function($scope, $segment, $request, $logID) {
      foreach ($request['items'] as $item) {
        $itemID = $scope->daoFactory->get('gmp\packing\atpLuminometer\ItemLogs')->insert([
          'capture_date_id' => $logID,
          'item_id' => $item['id']
        ]);

        foreach ($item['weeks'] as $week) {
          $weekID = $scope->daoFactory->get('gmp\packing\atpLuminometer\WeekLogs')->insert([
            'item_log_id' => $itemID,
            'week_num' => $week['week_num'],
            'date' => $week['date']
          ]);

          foreach ($week['types'] as $type) {
            foreach ($type['tests'] as $test) {
              $testID = $scope->daoFactory->get('gmp\packing\atpLuminometer\TestLogs')->insert([
                'week_log_id' => $weekID,
                'type_id' => $type['id'],
                'test_num' => $test['test_num'],
                'reading' => $test['reading'],
                'notes' => $test['notes']
              ]);
            }
          }
        }
      }
    }
  ],
  FALSE,
  TRUE
);

?>
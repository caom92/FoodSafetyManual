<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUpdateService(
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
    'extra_info' => NULL,
    'function' => function($scope, $request) {
      $getValueFromArrayIfExists = function($array, $key) {
        return (isset($array[$key]) && array_key_exists($key, $array)) ?
          $array[$key] : NULL;
      };

      $itemLogs = $scope->daoFactory->get('gmp\packing\atpLuminometer\ItemLogs');
      $weekLogs = $scope->daoFactory->get('gmp\packing\atpLuminometer\WeekLogs');
      $testLogs = $scope->daoFactory->get('gmp\packing\atpLuminometer\TestLogs');

      foreach ($request['items'] as $item) {
        $lastWeekNumber = 1;
        $itemLogID = $itemLogs->selectIDByCaptureDateIDAndItemID($request['report_id'], $item['id']);
        
        foreach ($item['weeks'] as $week) {
          $hasWeek = $weekLogs->hasByItemLogIDAndWeek(
            $itemLogID,
            $week['week_num']
          );

          if ($hasWeek) {
            // week exists, update
            $weekLogs->updateByItemLogIDAndWeek(
              [
                'date' => $week['date'],
              ],
              $itemLogID,
              $week['week_num']
            );

            $weekID = $weekLogs->selectIDByItemLogIDAndWeek(
              $itemLogID,
              $week['week_num']
            );

            // then update the tests of that week

            foreach ($week['types'] as $type) {
              foreach ($type['tests'] as $test) {
                $testLogs->updateByTypeIDAndWeekIDAndTest(
                  [
                    'reading' => $test['reading'],
                    'notes' => $test['notes']
                  ],
                  $type['id'],
                  $weekID,
                  $test['test_num']
                );
              }
            }
          } else {
            // add week
            $weekID = $scope->daoFactory->get('gmp\packing\atpLuminometer\WeekLogs')->insert([
              'item_log_id' => $itemLogID,
              'week_num' => $week['week_num'],
              'date' => $week['date']
            ]);

            // then add the tests of that week
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
          $lastWeekNumber = $week['week_num'];
        }

        // select the list of weeks to delete

        $weeksToDelete = $weekLogs->selectHigherWeekByItemLogID($itemLogID, $lastWeekNumber);

        foreach ($weeksToDelete as $weekToDelete) {
          // delete tests before deleting weeks
          $testLogs->delete([
            'week_log_id' => $weekToDelete['id']
          ]);
        }

        // delete weeks higher than last (since they were deleted in the frontend)

        $weekLogs->delete([
          'AND' => [
            'item_log_id' => $itemLogID,
            'week_num[>]' => $lastWeekNumber
          ]
        ]);
      }
    }
  ]
);

?>
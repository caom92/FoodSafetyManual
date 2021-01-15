<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createUpdateService(
  'GAP',
  'Packing',
  'Bathroom Cleaning Record',
  [
    'days' => [
      'type' => 'array',
      'values' => [
        'date' => [
          'type' => 'datetime',
          'format' => 'Y-m-d'
        ],
        'time' => [
          'type' => 'datetime',
          'format' => 'G:i'
        ],
        'initials' => [
          'type' => 'string',
          'max_length' => 255,
          'optional' => true
        ],
        'day_num' => [
          'type' => 'int'
        ],
        'items' => [
          'type' => 'array',
          'values' => [
            'item_id' => [
              'type' => 'int',
              'min' => 1
            ],
            'status' => [
              'type' => 'bool',
              'optional' => true
            ],
            'activity' => [
              'type' => 'string',
              'min_length' => 1,
              'max_length' => 255,
              'optional' => true
            ]
          ]
        ]
      ]
    ]
  ],
  [
    'extra_info' => [
      // NULL
    ],
    'function' => function($scope, $request) {
      $dateLogs = $scope->daoFactory->get('gap\packing\bathroomCleaning\DateLogs');
      $itemLogs = $scope->daoFactory->get('gap\packing\bathroomCleaning\ItemLogs');

      $lastDayNumber = 1;

      foreach ($request['days'] as $day) {
        $hasDay = $dateLogs->hasByCaptureDateIDAndDay($request['report_id'], $day['day_num']);

        if ($hasDay) {
          // day exists, update
          $dateLogs->updateByCapturedLogIDAndDay(
            [
              'date' => $day['date'],
              'time' => $day['time'],
              'initials' => $day['initials']
            ],
            $request['report_id'],
            $day['day_num']
          );

          $dateID = $dateLogs->selectIDByCaptureDateIDAndDay($request['report_id'], $day['day_num']);

          foreach ($day['items'] as $item) {
            $itemLogs->updateByDateIDAndToolID(
              [
                'status' => (isset($item['status']) && array_key_exists('status', $item)) ? $item['status'] : NULL,
                'activity' => (isset($item['activity']) && array_key_exists('activity', $item)) ? $item['activity'] : NULL
              ],
              $dateID,
              $item['item_id']
            );
          }
        } else {
          // day doesn't exist, add
          $dateID = $dateLogs->insert([
            'capture_date_id' => $logID,
            'date' => $day['date'],
            'day_num' => $day['day_num']
          ]);

          foreach ($day['items'] as $item) {
            $itemLogs->insert([
              'date_log_id' => $dateID,
              'item_id' => $item['item_id'],
              'status' => (isset($item['status']) && array_key_exists('status', $item)) ? $item['status'] : NULL,
              'activity' => (isset($item['activity']) && array_key_exists('activity', $item)) ? $item['activity'] : NULL
            ]);
          }
        }

        $lastDayNumber = $day['day_num'];
      }

      // select the list of days to delete

      $daysToDelete = $dateLogs->selectHigherDayByCaptureDateID($request['report_id'], $lastDayNumber);

      foreach ($daysToDelete as $dayToDelete) {
        // delete items before deleting days
        $itemLogs->delete([
          'date_log_id' => $dayToDelete['id']
        ]);
      }

      // delete days higher than last (since they were deleted in the frontend)

      $dateLogs->delete([
        'AND' => [
          'capture_date_id' => $request['report_id'],
          'day_num[>]' => $lastDayNumber
        ]
      ]);
    }
  ]
);

?>
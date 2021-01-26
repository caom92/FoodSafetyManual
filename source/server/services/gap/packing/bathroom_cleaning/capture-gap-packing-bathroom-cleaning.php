<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createCaptureService(
  'GAP',
  'Fields',
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
    'function' => function($scope, $segment, $request, $logID) {
      foreach ($request['days'] as $day) {
        $dateID = $scope->daoFactory->get('gap\packing\bathroomCleaning\DateLogs')->insert([
          'capture_date_id' => $logID,
          'date' => $day['date'],
          'time' => $day['time'],
          'initials' => (isset($day['initials']) && array_key_exists('initials', $day)) ? $day['initials'] : NULL,
          'day_num' => $day['day_num']
        ]);

        foreach ($day['items'] as $item) {
          $scope->daoFactory->get('gap\packing\bathroomCleaning\ItemLogs')->insert([
            'date_log_id' => $dateID,
            'item_id' => $item['item_id'],
            'status' => (isset($item['status']) && array_key_exists('status', $item)) ? $item['status'] : NULL,
            'activity' => (isset($item['activity']) && array_key_exists('activity', $item)) ? $item['activity'] : NULL
          ]);
        }
      }
    }
  ],
  FALSE,
  TRUE
);

?>
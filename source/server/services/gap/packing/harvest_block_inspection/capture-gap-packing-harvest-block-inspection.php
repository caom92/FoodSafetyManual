<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createCaptureService(
  'GAP',
  'Fields',
  'Pre-Harvest Block Inspection',
  [
    'inspection_start_date' => [
      'type' => 'datetime',
      'format' => 'Y-m-d',
      'optional' => true
    ],
    'inspection_start_time' => [
      'type' => 'datetime',
      'format' => 'G:i',
      'optional' => true
    ],
    'inspection_end_date' => [
      'type' => 'datetime',
      'format' => 'Y-m-d',
      'optional' => true
    ],
    'inspection_end_time' => [
      'type' => 'datetime',
      'format' => 'G:i',
      'optional' => true
    ],
    'commodities' => [
      'type' => 'string'
    ],
    'pounds' => [
      'type' => 'int'
    ],
    'grower' => [
      'type' => 'string'
    ],
    'block_code' => [
      'type' => 'string'
    ],
    'contact' => [
      'type' => 'string'
    ],
    'location' => [
      'type' => 'string'
    ],
    'country' => [
      'type' => 'string'
    ],
    'items' => [
      'type' => 'array',
      'values' => [
        'id' => [
          'type' => 'int',
          'min' => 1
        ],
        'status' => [
          'type' => 'bool',
          'optional' => true
        ],
        'comment' => [
          'type' => 'string',
          'optional' => true
        ]
      ]
    ]
  ],
  [
    'extra_info' => [
      // NULL
    ],
    'function' => function($scope, $segment, $request, $logID) {
      $info = $scope->daoFactory->get('gap\packing\harvestBlockInspection\InfoLogs');
      $logs = $scope->daoFactory->get('gap\packing\harvestBlockInspection\QuestionLogs');

      $infoRows = [
        'capture_date_id' => $logID,
        'inspection_start_date' => (isset($request['inspection_start_date']) && array_key_exists('inspection_start_date', $request)) ? $request['inspection_start_date'] : NULL,
        'inspection_start_time' => (isset($request['inspection_start_time']) && array_key_exists('inspection_start_time', $request)) ? $request['inspection_start_time'] : NULL,
        'inspection_end_date' => (isset($request['inspection_end_date']) && array_key_exists('inspection_end_date', $request)) ? $request['inspection_end_date'] : NULL,
        'inspection_end_time' => (isset($request['inspection_end_time']) && array_key_exists('inspection_end_time', $request)) ? $request['inspection_end_time'] : NULL,
        'commodities' => (isset($request['commodities']) && array_key_exists('commodities', $request)) ? $request['commodities'] : NULL,
        'pounds' => (isset($request['pounds']) && array_key_exists('pounds', $request)) ? $request['pounds'] : NULL,
        'grower' => (isset($request['grower']) && array_key_exists('grower', $request)) ? $request['grower'] : NULL,
        'block_code' => (isset($request['block_code']) && array_key_exists('block_code', $request)) ? $request['block_code'] : NULL,
        'contact' => (isset($request['contact']) && array_key_exists('contact', $request)) ? $request['contact'] : NULL,
        'location' => (isset($request['location']) && array_key_exists('location', $request)) ? $request['location'] : NULL,
        'country' => (isset($request['country']) && array_key_exists('country', $request)) ? $request['country'] : NULL
      ];

      $logData = [];

      foreach ($request['items'] as $item) {
        array_push($logData, [
          'capture_date_id' => $logID,
          'item_id' => $item['id'],
          'status' => (isset($item['status']) && array_key_exists('status', $item)) ? $item['status'] : NULL,
          'comment' => (isset($item['comment']) && array_key_exists('comment', $item)) ? $item['comment'] : NULL
        ]);
      }

      $info->insert($infoRows);
      $insertedRows = $logs->insert($logData);

      return $insertedRows;
    }
  ],
  FALSE,
  TRUE
);

?>
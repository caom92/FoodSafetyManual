<?php

require_once realpath(dirname(__FILE__).'/../../../../service_creators.php');

$service = fsm\createCaptureService(
  'GAP',
  'Fields',
  'Master Sanitation Schedule',
  [
    'items' => [
      'type' => 'array',
      'values' => [
        'id' => [
          'type' => 'int',
          'min' => 1
        ],
        'status' => [
          'type' => 'int',
          'min' => 1,
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
      $logs = $scope->daoFactory->get('gap\packing\masterSanitation\Logs');

      $logData = [];

      foreach ($request['items'] as $item) {
        array_push($logData, [
          'capture_date_id' => $logID,
          'check_id' => $item['id'],
          'status' => (isset($item['status']) && array_key_exists('status', $item)) ? $item['status'] : NULL
        ]);
      }

      $insertedRows = $logs->insert($logData);

      return $insertedRows;
    }
  ],
  FALSE,
  TRUE
);

?>

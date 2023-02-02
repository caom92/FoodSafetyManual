<?php

require_once realpath(dirname(__FILE__).'/../../../../service_creators.php');

$service = fsm\createUpdateService(
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
    'function' => function($scope, $request) {
      $logs = $scope->daoFactory->get('gap\packing\masterSanitation\Logs');

      $logData = [];

      foreach ($request['items'] as $item) {
        $logs->updateByCapturedLogIDAndCheckID([
          'status' => (isset($item['status']) && array_key_exists('status', $item)) ? $item['status'] : NULL
        ], $request['report_id'], $item['id']);
      }
    }
  ],
  FALSE,
  TRUE
);

?>

<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUpdateService(
  'GMP',
  'Packing',
  'Cold Room Temperature Control',
  [
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
        'deficiencies' => [
          'type' => 'string',
          'max_length' => 65535,
          'optional' => true
        ],
        'corrective_action' => [
          'type' => 'string',
          'max_length' => 65535,
          'optional' => true
        ]
      ]
    ]
  ],
  [
    'extra_info' => NULL,
    'function' => function($scope, $request) {
      $logs = $scope->daoFactory->get('gmp\packing\coldRoomTemp\Logs');
      foreach ($request['items'] as $room) {
        $logs->updateByCapturedLogIDAndRoomID(
          [
            'test' => $room['test'],
            'deficiencies' => $room['deficiencies'],
            'corrective_actions' => $room['corrective_action']
          ],
          $request['report_id'],
          $room['id']
        );
      }
    }
  ]
);

?>
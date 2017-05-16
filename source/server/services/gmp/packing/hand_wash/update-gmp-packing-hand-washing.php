<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = fsm\createUpdateService(
  'GMP',
  'Packing',
  'Daily Hand Washing Inspection',
  [
    'notes' => [
      'type' => 'string',
      'max_length' => 256
    ],
    'items' => [
      'type' => 'array',
      'values' => [
        'id' => [
          'type' => 'int',
          'min' => 1
        ],
        'is_acceptable' => [
          'type' => 'bool'
        ]
      ]
    ]
  ],
  [
    'extra_info' => [
      'notes',
    ],
    'function' => function($scope, $request) {
      $logs = $scope->daoFactory->get('gmp\packing\handWash\Logs');
      foreach ($request['items'] as $item) {
        $logs->updateByCapturedLogIDAndCharacteristicID(
          [ 'is_acceptable' => $item['is_acceptable'] ],
          $request['report_id'],
          $item['id']
        );
      }
    }
  ]
);

?>
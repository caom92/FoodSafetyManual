<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUpdateService(
  'GMP',
  'Packing',
  'Daily Scissors & Knives Inspection',
  [
    'notes' => [
      'type' => 'string',
      'max_length' => 256,
      'optional' => true
    ],
    'items' => [
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
        'approved' => [
          'type' => 'bool'
        ],
        'condition' => [
          'type' => 'bool'
        ],
        'is_sanitized' => [
          'type' => 'bool'
        ],
        'corrective_action' => [
          'type' => 'string',
          'max_length' => 256,
          'optional' => true
        ]
      ]
    ]
  ],
  [
    'extra_info' => [
      'notes',
    ],
    'function' => function($scope, $request) {
      $logs = $scope->daoFactory->get('gmp\packing\scissors\Logs');
      foreach ($request['items'] as $group) {
        $logs->updateByCapturedLogIDAndGroupID(
          [
            'time' => $group['time'],
            'group_id' => $group['id'],
            'was_approved' => $group['approved'],
            'was_returned' => $group['condition'],
            'was_sanitized' => $group['is_sanitized'],
            'corrective_actions' => $group['corrective_action']
          ],
          $request['report_id'],
          $group['id']
        );
      }
    }
  ]
);

?>
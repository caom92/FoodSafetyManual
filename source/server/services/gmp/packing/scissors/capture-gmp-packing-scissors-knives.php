<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createCaptureService(
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
    'function' => function($scope, $segment, $request, $logID) {
      // initialize the array of rows to be inserted to the database
      $rows = [];

      // then visit each group
      foreach ($request['items'] as $group) {
        // check if the group has corrective actions
        $hasCorrectiveAction = 
          isset($group['corrective_action']) 
          && array_key_exists('corrective_action', $group);

        // store the group info to the array of rows
        array_push($rows, [
          'capture_date_id' => $logID,
          'time' => $group['time'],
          'group_id' => $group['id'],
          'was_approved' => $group['approved'],
          'was_returned' => $group['condition'],
          'was_sanitized' => $group['is_sanitized'],
          'corrective_actions' => ($hasCorrectiveAction) ?
            $group['corrective_action'] : ''
        ]);
      }

      // finally insert the rows to the database
      return $scope->daoFactory->get('gmp\packing\scissor\Logs')->insert($rows);
    }
  ]
);

?>
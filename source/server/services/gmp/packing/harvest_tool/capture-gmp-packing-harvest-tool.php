<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createCaptureService(
  'GMP',
  'Packing',
  'Cutting Tool Accountability Program And Sanitizing Log',
  [
    'days' => [
      'type' => 'array',
      'values' => [
        'date' => [
          'type' => 'datetime',
          'format' => 'Y-m-d'
        ],
        'day_num' => [
          'type' => 'int'
        ],
        'tools' => [
          'type' => 'array',
          'values' => [
            'tool_id' => [
              'type' => 'int',
              'min' => 1
            ],
            'issue_time' => [
              'type' => 'datetime',
              'format' => 'G:i',
              'optional' => true
            ],
            'issue_qty' => [
              'type' => 'int',
              'optional' => true
            ],
            'issue_conditions' => [
              'type' => 'int',
              'min' => 0,
              'max' => 1,
              'optional' => true
            ],
            'recovery_time' => [
              'type' => 'datetime',
              'format' => 'G:i',
              'optional' => true
            ],
            'recovery_qty' => [
              'type' => 'int',
              'optional' => true
            ],
            'recovery_conditions' => [
              'type' => 'int',
              'min' => 0,
              'max' => 1,
              'optional' => true
            ],
            'sanitation' => [
              'type' => 'int',
              'min' => 0,
              'optional' => true
            ],
            'deficiencies' => [
              'type' => 'string',
              'max_length' => 65535,
              'optional' => true
            ],
            'corrective_actions' => [
              'type' => 'string',
              'max_length' => 65535,
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
        $dateID = $scope->daoFactory->get('gmp\packing\harvestTool\DateLogs')->insert([
          'capture_date_id' => $logID,
          'date' => $day['date'],
          'day_num' => $day['day_num']
        ]);

        foreach ($day['tools'] as $tool) {
          $scope->daoFactory->get('gmp\packing\harvestTool\ToolLogs')->insert([
            'date_log_id' => $dateID,
            'tool_id' => $tool['tool_id'],
            'issue_time' => (isset($tool['issue_time']) && array_key_exists('issue_time', $tool)) ? $tool['issue_time'] : NULL,
            'issue_qty' => (isset($tool['issue_qty']) && array_key_exists('issue_qty', $tool)) ? $tool['issue_qty'] : NULL,
            'issue_conditions' => (isset($tool['issue_conditions']) && array_key_exists('issue_conditions', $tool)) ? $tool['issue_conditions'] : NULL,
            'recovery_time' => (isset($tool['recovery_time']) && array_key_exists('recovery_time', $tool)) ? $tool['recovery_time'] : NULL,
            'recovery_qty' => (isset($tool['recovery_qty']) && array_key_exists('recovery_qty', $tool)) ? $tool['recovery_qty'] : NULL,
            'recovery_conditions' => (isset($tool['recovery_conditions']) && array_key_exists('recovery_conditions', $tool)) ? $tool['recovery_conditions'] : NULL,
            'sanitation' => (isset($tool['sanitation']) && array_key_exists('sanitation', $tool)) ? $tool['sanitation'] : NULL,
            'deficiencies' => (isset($tool['deficiencies']) && array_key_exists('deficiencies', $tool)) ? $tool['deficiencies'] : NULL,
            'corrective_actions' => (isset($tool['corrective_actions']) && array_key_exists('corrective_actions', $tool)) ? $tool['corrective_actions'] : NULL
          ]);
        }
      }
    }
  ],
  FALSE,
  TRUE
);

?>
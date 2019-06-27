<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createCaptureService(
  'GMP',
  'Packing',
  'Harvest Tool Accountability Program And Sanitizing Log',
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
        'types' => [
          'type' => 'array',
          'values' => [
            'type_id' => [
              'type' => 'int',
              'min' => 1
            ],
            'issue_time' => [
              'type' => 'datetime',
              'format' => 'G:i'
            ],
            'issue_qty' => [
              'type' => 'int'
            ],
            'issue_conditions' => [
              'type' => 'int',
              'min' => 0,
              'max' => 1
            ],
            'recovery_time' => [
              'type' => 'datetime',
              'format' => 'G:i'
            ],
            'recovery_qty' => [
              'type' => 'int'
            ],
            'recovery_conditions' => [
              'type' => 'int',
              'min' => 0,
              'max' => 1
            ],
            'sanitation' => [
              'type' => 'int',
              'min' => 0
            ],
            'deficiencies' => [
              'type' => 'string',
              'max_length' => 65535
            ],
            'corrective_actions' => [
              'type' => 'string',
              'max_length' => 65535
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

        foreach ($day['types'] as $type) {
          $scope->daoFactory->get('gmp\packing\harvestTool\TypeLogs')->insert([
            'date_log_id' => $dateID,
            'type_id' => $type['type_id'],
            'issue_time' => $type['issue_time'],
            'issue_qty' => $type['issue_qty'],
            'issue_conditions' => $type['issue_conditions'],
            'recovery_time' => $type['recovery_time'],
            'recovery_qty' => $type['recovery_qty'],
            'recovery_conditions' => $type['recovery_conditions'],
            'sanitation' => $type['sanitation'],
            'deficiencies' => $type['deficiencies'],
            'corrective_actions' => $type['corrective_actions']
          ]);
        }
      }
    }
  ],
  FALSE,
  TRUE
);

?>
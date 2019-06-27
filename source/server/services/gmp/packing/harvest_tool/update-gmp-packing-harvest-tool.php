<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createUpdateService(
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
    'function' => function($scope, $request) {
      $dateLogs = $scope->daoFactory->get('gmp\packing\harvestTool\DateLogs');
      $typeLogs = $scope->daoFactory->get('gmp\packing\harvestTool\TypeLogs');

      $lastDayNumber = 1;

      foreach ($request['days'] as $day) {
        $hasDay = $dateLogs->hasByCaptureDateIDAndDay($request['report_id'], $day['day_num']);

        if ($hasDay) {
          // day exists, update
          $dateLogs->updateByCapturedLogIDAndDay(
            [
              'date' => $day['date']
            ],
            $request['report_id'],
            $day['day_num']
          );

          $dateID = $dateLogs->selectIDByCaptureDateIDAndDay($request['report_id'], $day['day_num']);

          foreach ($day['types'] as $type) {
            $typeLogs->updateByDateIDAndTypeID(
              [
                'issue_time' => $type['issue_time'],
                'issue_qty' => $type['issue_qty'],
                'issue_conditions' => $type['issue_conditions'],
                'recovery_time' => $type['recovery_time'],
                'recovery_qty' => $type['recovery_qty'],
                'recovery_conditions' => $type['recovery_conditions'],
                'sanitation' => $type['sanitation'],
                'deficiencies' => $type['deficiencies'],
                'corrective_actions' => $type['corrective_actions']
              ],
              $dateID,
              $type['type_id']
            );
          }
        } else {
          // day doesn't exist, add
          $dateID = $dateLogs->insert([
            'capture_date_id' => $logID,
            'date' => $day['date'],
            'day_num' => $day['day_num']
          ]);

          foreach ($day['types'] as $type) {
            $typeLogs->insert([
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

        $lastDayNumber = $day['day_num'];
      }

      // select the list of days to delete

      $daysToDelete = $dateLogs->selectHigherDayByCaptureDateID($request['report_id'], $lastDayNumber);

      foreach ($daysToDelete as $dayToDelete) {
        // delete types before deleting days
        $typeLogs->delete([
          'date_log_id' => $dayToDelete['id']
        ]);
      }

      // delete days higher than last (since they were deleted in the frontend)

      $dateLogs->delete([
        'AND' => [
          'capture_date_id' => $request['report_id'],
          'day_num[>]' => $lastDayNumber
        ]
      ]);
    }
  ]
);

?>
<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createUpdateService(
  'GAP',
  'Fields',
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
        'tools' => [
          'type' => 'array',
          'values' => [
            'tool_id' => [
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
              'max' => 2
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
      $dateLogs = $scope->daoFactory->get('gap\packing\harvestTool\DateLogs');
      $toolLogs = $scope->daoFactory->get('gap\packing\harvestTool\ToolLogs');

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

          foreach ($day['tools'] as $tool) {
            $toolLogs->updateByDateIDAndToolID(
              [
                'issue_time' => $tool['issue_time'],
                'issue_qty' => $tool['issue_qty'],
                'issue_conditions' => $tool['issue_conditions'],
                'recovery_time' => $tool['recovery_time'],
                'recovery_qty' => $tool['recovery_qty'],
                'recovery_conditions' => $tool['recovery_conditions'],
                'sanitation' => $tool['sanitation'],
                'deficiencies' => $tool['deficiencies'],
                'corrective_actions' => $tool['corrective_actions']
              ],
              $dateID,
              $tool['tool_id']
            );
          }
        } else {
          // day doesn't exist, add
          $dateID = $dateLogs->insert([
            'capture_date_id' => $logID,
            'date' => $day['date'],
            'day_num' => $day['day_num']
          ]);

          foreach ($day['tools'] as $tool) {
            $toolLogs->insert([
              'date_log_id' => $dateID,
              'tool_id' => $tool['tool_id'],
              'issue_time' => $tool['issue_time'],
              'issue_qty' => $tool['issue_qty'],
              'issue_conditions' => $tool['issue_conditions'],
              'recovery_time' => $tool['recovery_time'],
              'recovery_qty' => $tool['recovery_qty'],
              'recovery_conditions' => $tool['recovery_conditions'],
              'sanitation' => $tool['sanitation'],
              'deficiencies' => $tool['deficiencies'],
              'corrective_actions' => $tool['corrective_actions']
            ]);
          }
        }

        $lastDayNumber = $day['day_num'];
      }

      // select the list of days to delete

      $daysToDelete = $dateLogs->selectHigherDayByCaptureDateID($request['report_id'], $lastDayNumber);

      foreach ($daysToDelete as $dayToDelete) {
        // delete tools before deleting days
        $toolLogs->delete([
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
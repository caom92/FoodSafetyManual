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
                'issue_time' => (isset($type['issue_time']) && array_key_exists('issue_time', $type)) ? $type['issue_time'] : NULL,
                'issue_qty' => (isset($type['issue_qty']) && array_key_exists('issue_qty', $type)) ? $type['issue_qty'] : NULL,
                'issue_conditions' => (isset($type['issue_conditions']) && array_key_exists('issue_conditions', $type)) ? $type['issue_conditions'] : NULL,
                'recovery_time' => (isset($type['recovery_time']) && array_key_exists('recovery_time', $type)) ? $type['recovery_time'] : NULL,
                'recovery_qty' => (isset($type['recovery_qty']) && array_key_exists('recovery_qty', $type)) ? $type['recovery_qty'] : NULL,
                'recovery_conditions' => (isset($type['recovery_conditions']) && array_key_exists('recovery_conditions', $type)) ? $type['recovery_conditions'] : NULL,
                'sanitation' => (isset($type['sanitation']) && array_key_exists('sanitation', $type)) ? $type['sanitation'] : NULL,
                'deficiencies' => (isset($type['deficiencies']) && array_key_exists('deficiencies', $type)) ? $type['deficiencies'] : NULL,
                'corrective_actions' => (isset($type['corrective_actions']) && array_key_exists('corrective_actions', $type)) ? $type['corrective_actions'] : NULL
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
              'issue_time' => (isset($type['issue_time']) && array_key_exists('issue_time', $type)) ? $type['issue_time'] : NULL,
              'issue_qty' => (isset($type['issue_qty']) && array_key_exists('issue_qty', $type)) ? $type['issue_qty'] : NULL,
              'issue_conditions' => (isset($type['issue_conditions']) && array_key_exists('issue_conditions', $type)) ? $type['issue_conditions'] : NULL,
              'recovery_time' => (isset($type['recovery_time']) && array_key_exists('recovery_time', $type)) ? $type['recovery_time'] : NULL,
              'recovery_qty' => (isset($type['recovery_qty']) && array_key_exists('recovery_qty', $type)) ? $type['recovery_qty'] : NULL,
              'recovery_conditions' => (isset($type['recovery_conditions']) && array_key_exists('recovery_conditions', $type)) ? $type['recovery_conditions'] : NULL,
              'sanitation' => (isset($type['sanitation']) && array_key_exists('sanitation', $type)) ? $type['sanitation'] : NULL,
              'deficiencies' => (isset($type['deficiencies']) && array_key_exists('deficiencies', $type)) ? $type['deficiencies'] : NULL,
              'corrective_actions' => (isset($type['corrective_actions']) && array_key_exists('corrective_actions', $type)) ? $type['corrective_actions'] : NULL
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
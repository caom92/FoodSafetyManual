<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUpdateService(
  'GMP',
  'Pest Control',
  'Self Inspection',
  [
    'notes' => [
      'type' => 'string',
      'max_length' => 128
    ],
    'stations' => [
      'type' => 'array',
      'values' => [
        'id' => [
          'type' => 'int',
          'min' => 1
        ],
        'is_secured' => [
          'type' => 'bool'
        ],
        'condition' => [
          'type' => 'bool'
        ],
        'activity' => [
          'type' => 'bool'
        ],
        'corrective_actions' => [
          'type' => 'string',
          'max_length' => 128
        ]
      ]
    ]
  ],
  [
    'extra_info' => [
      'notes',
    ],
    'function' => function($scope, $request) {
      $logs = $scope->daoFactory->get('gmp\selfInspection\pestControl\Logs');
      foreach ($request['stations'] as $station) {
        $logs->updateByCapturedLogIDAndStationID(
          [
            'is_secured' => $station['is_secured'],
            'is_condition_acceptable' => $station['condition'],
            'has_activity' => $station['activity'],
            'corrective_actions' => $station['corrective_actions']
          ],
          $request['report_id'],
          $station['id']
        );
      }
    }
  ]
);

?>
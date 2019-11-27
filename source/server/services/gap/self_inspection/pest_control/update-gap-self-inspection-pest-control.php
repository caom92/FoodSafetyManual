<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUpdateService(
  'GAP',
  'Self Inspection',
  'Pest Control & Log',
  [
    'notes' => [
      'type' => 'string',
      'max_length' => 65535
    ],
    'stations' => [
      'type' => 'array',
      'values' => [
        'id' => [
          'type' => 'int',
          'min' => 1
        ],
        /*'is_secured' => [
          'type' => 'bool'
        ],*/
        'condition' => [
          'type' => 'bool'
        ],
        'activity' => [
          'type' => 'bool'
        ],
        'corrective_actions' => [
          'type' => 'string',
          'max_length' => 65535
        ]
      ]
    ]
  ],
  [
    'extra_info' => [
      'notes',
    ],
    'function' => function($scope, $request) {
      $logs = $scope->daoFactory->get('gap\selfInspection\pestControl\Logs');
      foreach ($request['stations'] as $station) {
        $logs->updateByCapturedLogIDAndStationID(
          [
            //'is_secured' => $station['is_secured'],
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
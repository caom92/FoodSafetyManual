<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createCaptureService(
  'GMP',
  'Self Inspection',
  'Pest Control',
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
          'max_length' => 65535,
          'optional' => true
        ],
        'observations' => [
          'type' => 'string',
          'max_length' => 65535,
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
      // prepare the array of rows to insert to the database
      $rows = [];

      // visit each station
      foreach ($request['stations'] as $station) {
        // and store its information in the row array
        array_push($rows, [
          'capture_date_id' => $logID,
          'station_id' => $station['id'],
          'is_secured' => $station['is_secured'],
          'is_condition_acceptable' => $station['condition'],
          'has_activity' => $station['activity'],
          'corrective_actions' => (isset($station['corrective_actions']) && array_key_exists('corrective_actions', $station)) ? $station['corrective_actions'] : NULL,
          'observations' => (isset($station['observations']) && array_key_exists('observations', $station)) ? $station['observations'] : NULL
        ]);
      }

      // finally, insert all the rows to the database
      return $scope->daoFactory->get('gmp\selfInspection\pestControl\Logs')
        ->insert($rows);
    }
  ]
);

?>
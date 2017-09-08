<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createCaptureService(
  'GMP',
  'Packing',
  'Cold Room Temperature Control',
  [
    'time' => [
      'type' => 'datetime',
      'format' => 'G:i'
    ],
    'items' => [
      'type' => 'array',
      'values' => [
        'id' => [
          'type' => 'int',
          'min' => 1
        ],
        'test' => [
          'type' => 'float'
        ],
        'deficiencies' => [
          'type' => 'string',
          'max_length' => 65535,
          'optional' => true
        ],
        'corrective_action' => [
          'type' => 'string',
          'max_length' => 65535,
          'optional' => true
        ]
      ]
    ]
  ],
  [
    'extra_info' => NULL,
    'function' => function($scope, $segment, $request, $logID) {
      // initialize the array of rows to be inserted to the database
      $rows = [];
      
      // then visit each thermometer
      foreach ($request['items'] as $item) {
        // check if the thermometer has corrective actions
        $hasCorrectiveAction = 
          isset($item['corrective_action']) 
          && array_key_exists('corrective_action', $item);

        // store the thermometer info to the array of rows
        array_push($rows, [
          'capture_date_id' => $logID,
          'room_id' => $item['id'],
          'test' => $item['test'],
          'deficiencies' => $item['deficiencies'],
          'corrective_actions' => ($hasCorrectiveAction) ?
            $item['corrective_action'] : ''
        ]);
      }

      // finally insert the rows to the database
      return $scope->daoFactory->get('gmp\packing\coldRoomTemp\Logs')
        ->insert($rows);
    }
  ]
);

?>
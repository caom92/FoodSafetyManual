<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createCaptureService(
  'GMP',
  'Packing',
  'Daily Hand Washing Inspection',
  [
    'notes' => [
      'type' => 'string',
      'max_length' => 65535
    ],
    'items' => [
      'type' => 'array',
      'values' => [
        'id' => [
          'type' => 'int',
          'min' => 1
        ],
        'is_acceptable' => [
          'type' => 'bool'
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

      // then visit each thermometer
      foreach ($request['items'] as $item) {
          // store the characteristic info to the array of rows
          array_push($rows, [
              'capture_date_id' => $logID,
              'characteristic_id' => $item['id'],
              'is_acceptable' => $item['is_acceptable']
          ]);
      }

      // finally insert the rows to the database
      return $scope->daoFactory->get('gmp\packing\handWash\Logs')
        ->insert($rows);
    }
  ]
);

?>
<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createCaptureService(
  'GMP',
  'Packing',
  'Glass & Brittle Plastic Inspection',
  [
    'areas' => [
      'type' => 'array',
      'values' => [
        'id' => [
          'type' => 'int',
          'min' => 1
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
      ]
    ]
  ],
  [
    'extra_info' => [
      'time',
      'notes'
    ],
    'function' => function($scope, $segment, $request, $logID) {
      // initialize the array of rows to be inserted to the database
      $rows = [];

      // then visit each area
      foreach ($request['areas'] as $area) {
        foreach ($area['items'] as $item) {
          // store the group info to the array of rows
          array_push($rows, [
            'capture_date_id' => $logID,
            'area_glass_id' => $item['id'],
            'is_acceptable' => $item['is_acceptable']
          ]);
        }
      }

      // finally insert the rows to the database
      return $scope->daoFactory->get('gmp\packing\glass\Logs')
        ->insert($rows);
    }
  ]
);

?>
<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createCaptureService(
  'GMP',
  'Packing',
  'Daily Finished Product Check',
  [
    'entries' => [
      'type' => 'array',
      'values' => [
        'batch' => [
          'type' => 'int',
          'min' => 1
        ],
        'production_area_id' => [
          'type' => 'int',
          'min' => 1
        ],
        'supplier_id' => [
          'type' => 'int',
          'min' => 1
        ],
        'product_id' => [
          'type' => 'int',
          'min' => 1
        ],
        'customer_id' => [
          'type' => 'int',
          'min' => 1
        ],
        'quality_type_id' => [
          'type' => 'int',
          'min' => 1
        ],
        'origin' => [
          'type' => 'string',
          'length' => 3
        ],
        'expiration_date' => [
          'type' => 'datetime',
          'format' => 'Y-m-d'
        ],
        'water_temperature' => [
          'type' => 'float'
        ],
        'product_temperature' => [
          'type' => 'float'
        ],
        'is_weight_correct' => [
          'type' => 'bool'
        ],
        'is_label_correct' => [
          'type' => 'bool'
        ],
        'is_trackable' => [
          'type' => 'bool'
        ],
        'notes' => [
          'type' => 'string',
          'min_length' => 3,
          'max_length' => 128
        ]
      ]
    ]
  ],
  [
    'extra_info' => [
      // NULL
    ],
    'function' => function($scope, $segment, $request, $logID) {
      // prepare the array of rows to insert to the database
      $rows = [];

      // visit each entry
      foreach ($request['entries'] as $entry) {
        // add the capture date ID
        $entry['capture_date_id'] = $logID;
        array_push($rows, $entry);
      }

      // finally, insert all the rows to the database
      return $scope->daoFactory->get('gmp\packing\finishedProduct\Logs')
        ->insert($rows);
    }
  ]
);

?>
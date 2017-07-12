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
          'type' => 'string',
          'min_length' => 1
        ],
        // 'production_area_id' => [
        //   'type' => 'int',
        //   'min' => 1
        // ],
        // 'supplier_id' => [
        //   'type' => 'int',
        //   'min' => 1
        // ],
        // 'product_id' => [
        //   'type' => 'int',
        //   'min' => 1
        // ],
        // 'customer_id' => [
        //   'type' => 'int',
        //   'min' => 1
        // ],
        'production_area_id' => [
          'type' => 'string',
          'min_length' => 1,
          'max_length' => 255
        ],
        'supplier_id' => [
          'type' => 'string',
          'min_length' => 1,
          'max_length' => 255
        ],
        'product_id' => [
          'type' => 'string',
          'min_length' => 1,
          'max_length' => 255
        ],
        'customer_id' => [
          'type' => 'string',
          'min_length' => 1,
          'max_length' => 255
        ],
        'quality_type_id' => [
          'type' => 'int',
          'min' => 1
        ],
        'origin' => [
          'type' => 'string',
          'length' => 3,
          'optional' => TRUE
        ],
        'expiration_date' => [
          'type' => 'datetime',
          'format' => 'Y-m-d',
          'optional' => TRUE
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
          'min_length' => 1,
          'max_length' => 65535,
          'optional' => TRUE
        ],
        'album_url' => [
          'type' => 'string',
          'min_length' => 1,
          'max_length' => 65535,
          'optional' => TRUE
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
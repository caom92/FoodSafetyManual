<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createCaptureService(
  'GMP',
  'Packing',
  'QC Aged Product',
  [
    'entries' => [
      'type' => 'array',
      'values' => [
        'batch' => [
          'type' => 'string',
          'min_length' => 1,
          'optional' => TRUE
        ],
        'warehouse' => [
          'type' => 'string',
          'min_length' => 1,
          'max_length' => 255,
          'optional' => TRUE
        ],
        'vendor' => [
          'type' => 'string',
          'min_length' => 1,
          'max_length' => 255
        ],
        'item' => [
          'type' => 'string',
          'min_length' => 1,
          'max_length' => 255
        ],
        'age' => [
          'type' => 'int'
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
        'packed_date' => [
          'type' => 'datetime',
          'format' => 'Y-m-d'
        ],
        'quantity' => [
          'type' => 'int',
          'min' => 1
        ],
        'location' => [
          'type' => 'string',
          'min_length' => 1,
          'max_length' => 255,
          'optional' => TRUE
        ],
        'is_weight_correct' => [
          'type' => 'bool',
          'optional' => TRUE
        ],
        'is_label_correct' => [
          'type' => 'bool',
          'optional' => TRUE
        ],
        'is_trackable' => [
          'type' => 'bool',
          'optional' => TRUE
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
      return $scope->daoFactory->get('gmp\packing\agedProduct\Logs')
        ->insert($rows);
    }
  ]
);

?>
<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUpdateService(
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
    'extra_info' => NULL,
    'function' => function($scope, $request) {
      $logs = $scope->daoFactory->get('gmp\packing\finishedProduct\Logs');
      foreach ($request['entries'] as $entry) {
        $logs->updateByCapturedLogID(
          $entry,
          $request['report_id']
        );
      }
    }
  ]
);

?>
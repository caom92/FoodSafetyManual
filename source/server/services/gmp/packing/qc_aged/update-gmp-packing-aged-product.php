<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUpdateService(
  'GMP',
  'Packing',
  'QC Aged Product',
  [
    'entries' => [
      'type' => 'array',
      'values' => [
        'batch' => [
          'type' => 'string',
          'max_length' => 255,
          'optional' => TRUE
        ],
        'warehouse' => [
          'type' => 'string',
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
        'quality_id' => [
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
          'max_length' => 255,
          'optional' => TRUE
        ],
        'action_id' => [
          'type' => 'int',
          'min' => 1
        ],
        'notes' => [
          'type' => 'string',
          'max_length' => 65535,
          'optional' => TRUE
        ],
        'album_url' => [
          'type' => 'string',
          'max_length' => 65535,
          'optional' => TRUE
        ]
      ]
    ]
  ],
  [
    'extra_info' => NULL,
    'function' => function($scope, $request) {
      $logs = $scope->daoFactory->get('gmp\packing\agedProduct\Logs');
      $ids = $logs->selectIDByCapturedLogID($request['report_id']);

      for ($i = 0; $i < count($request['entries']); ++$i) {
        $logs->updateByCapturedLogIDAndID(
          $request['entries'][$i],
          $request['report_id'],
          $ids[$i]
        );
      }
    }
  ]
);

?>
<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUpdateService(
  'GMP',
  'Packing',
  'Revisión General de Producto Terminado',
  [
    'entries' => [
      'type' => 'array',
      'values' => [
        'batch' => [
          'type' => 'string',
          'min_length' => 1
        ],
        'production_area' => [
          'type' => 'string',
          'min_length' => 1,
          'max_length' => 80
        ],
        'supplier' => [
          'type' => 'string',
          'min_length' => 2,
          'max_length' => 80
        ],
        'product' => [
          'type' => 'string',
          'min_length' => 2,
          'max_length' => 80
        ],
        'customer' => [
          'type' => 'string',
          'min_length' => 2,
          'max_length' => 80
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
    'extra_info' => NULL,
    'function' => function($scope, $request) {
      $logs = $scope->daoFactory->get('gmp\packing\productRevision\Logs');
      $ids = $logs->selectIDByCapturedLogID($request['report_id']);

      for ($i = 0; $i < count($request['entries']); ++$i) {
        $hasExpirationDate = 
      	  isset($request['entries'][$i]['expiration_date']) 
          && array_key_exists('expiration_date', $request['entries'][$i]);
      	  
      	if (!$hasExpirationDate) {
      	  $request['entries'][$i]['expiration_date'] = NULL;
      	}

        $hasOrigin = 
          isset($request['entries'][$i]['origin']) 
          && array_key_exists('origin', $request['entries'][$i]);
          
        if (!$hasOrigin) {
          $request['entries'][$i]['origin'] = '';
        }


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
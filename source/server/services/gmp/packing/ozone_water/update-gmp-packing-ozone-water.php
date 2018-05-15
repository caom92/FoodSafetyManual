<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUpdateService(
  'GMP',
  'Packing',
  'Ozone Water Test Log',
  [
    'items' => [
      'type' => 'array',
      'values' => [
        'id' => [
          'type' => 'int',
          'min' => 1
        ],
        'reading' => [
          'type' => 'float',
          'optional' => TRUE
        ],
        'ph' => [
          'type' => 'float'
        ],
        'orp' => [
          'type' => 'float',
          'optional' => TRUE
        ],
        'temperature' => [
          'type' => 'float'
        ],
        'corrective_action' => [
          'type' => 'string',
          'max_length' => 65535,
          'optional' => TRUE
        ],
        'product' => [
          'type' => 'string',
          'max_length' => 255,
          'optional' => TRUE
        ],
        'lot' => [
          'type' => 'string',
          'max_length' => 255,
          'optional' => TRUE
        ],
        'parcel' => [
          'type' => 'string',
          'max_length' => 255,
          'optional' => TRUE
        ],
        'reference' => [
          'type' => 'string',
          'max_length' => 255,
          'optional' => TRUE
        ],
        'total_chlorine' => [
          'type' => 'float',
          'optional' => TRUE
        ],
        'free_chlorine' => [
          'type' => 'float',
          'optional' => TRUE
        ],
        'rinse' => [
          'type' => 'float',
          'optional' => TRUE
        ],
        'status' => [
          'type' => 'bool'
        ]
      ]
    ]
  ],
  [
    'extra_info' => NULL,
    'function' => function($scope, $request) {
      $getValueFromArrayIfExists = function($array, $key) {
        return (isset($array[$key]) && array_key_exists($key, $array)) ?
          $array[$key] : NULL;
      };

      $logs = $scope->daoFactory->get('gmp\packing\ozone\Logs');
      foreach ($request['items'] as $item) {
        $logs->updateByCapturedLogIDAndMachineID(
          [
            'was_test_passed' => $item['status'],
            'voltage' => $getValueFromArrayIfExists($item, 'reading'),
            'potential_hydrogen' => $item['ph'],
            'reduction_potential' => $getValueFromArrayIfExists($item, 'orp'),
            'temperature' => $item['temperature'],
            'total_chlorine' =>
              $getValueFromArrayIfExists($item, 'total_chlorine'),
            'free_chlorine' => 
              $getValueFromArrayIfExists($item, 'free_chlorine'),
            'rinse' => $getValueFromArrayIfExists($item, 'rinse'),
            'product' => $getValueFromArrayIfExists($item, 'product'),
            'lot' => $getValueFromArrayIfExists($item, 'lot'),
            'crop' => $getValueFromArrayIfExists($item, 'parcel'),
            'batch' => $getValueFromArrayIfExists($item, 'reference'),
            'corrective_actions' => 
              $getValueFromArrayIfExists($item, 'corrective_action')
          ],
          $request['report_id'],
          $item['id']
        );
      }
    }
  ]
);

?>
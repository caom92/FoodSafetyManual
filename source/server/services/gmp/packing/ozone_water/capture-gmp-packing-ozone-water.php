<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createCaptureService(
  'GMP',
  'Packing',
  'Ozone Water Test Log',
  [
    'date' => [
      'type' => 'datetime',
      'format' => 'Y-m-d'
    ],
    'items' => [
      'type' => 'array',
      'values' => [
        'id' => [
          'type' => 'int',
          'min' => 1
        ],
        'entries' => [
          'type' => 'array',
          'values' => [
            'test_number' => [
              'type' => 'int',
              'min' => 1
            ],
            'time' => [
              'type' => 'datetime',
              'format' => 'G:i'
            ],
            'reading' => [
              'type' => 'float',
              'optional' => TRUE
            ],
            'ph' => [
              'type' => 'float',
              'optional' => TRUE
            ],
            'orp' => [
              'type' => 'float',
              'optional' => TRUE
            ],
            'temperature' => [
              'type' => 'float',
              'optional' => TRUE
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
              'type' => 'bool',
              'optional' => TRUE
            ]
          ]
        ]
      ]
    ]
  ],
  [
    'extra_info' => NULL,
    'function' => function($scope, $segment, $request, $logID) {
      $getValueFromArrayIfExists = function($array, $key) {
        return (isset($array[$key]) && array_key_exists($key, $array)) ?
          $array[$key] : NULL;
      };

      $rows = [];

      foreach ($request['items'] as $item) {
        foreach ($item['entries'] as $entry) {
          array_push($rows, [
            'capture_date_id' => $logID,
            'machine_id' => $item['id'],
            'test_num' => $entry['test_number'],
            'time' => $entry['time'],
            'was_test_passed' => $getValueFromArrayIfExists($entry, 'status'),
            'voltage' => $getValueFromArrayIfExists($entry, 'reading'),
            'potential_hydrogen' => $getValueFromArrayIfExists($entry, 'ph'),
            'reduction_potential' => $getValueFromArrayIfExists($entry, 'orp'),
            'temperature' => $getValueFromArrayIfExists($entry, 'temperature'),
            'total_chlorine' =>
              $getValueFromArrayIfExists($entry, 'total_chlorine'),
            'free_chlorine' => $getValueFromArrayIfExists($entry, 'free_chlorine'),
            'rinse' => $getValueFromArrayIfExists($entry, 'rinse'),
            'product' => $getValueFromArrayIfExists($entry, 'product'),
            'lot' => $getValueFromArrayIfExists($entry, 'lot'),
            'crop' => $getValueFromArrayIfExists($entry, 'parcel'),
            'batch' => $getValueFromArrayIfExists($entry, 'reference'),
            'corrective_actions' => 
              $getValueFromArrayIfExists($entry, 'corrective_action')
          ]);
        }
      }

      return $scope->daoFactory->get('gmp\packing\ozone\Logs')
        ->insert($rows);
    }
  ],
  FALSE,
  TRUE
);

?>
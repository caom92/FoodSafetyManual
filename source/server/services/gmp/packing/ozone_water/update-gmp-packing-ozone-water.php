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
    'function' => function($scope, $request) {
      $getValueFromArrayIfExists = function($array, $key) {
        return (isset($array[$key]) && array_key_exists($key, $array)) ?
          $array[$key] : NULL;
      };

      $logs = $scope->daoFactory->get('gmp\packing\ozone\Logs');
      $rows = [];
      foreach ($request['items'] as $item) {
        $lastTestNumber = 1;
        foreach ($item['entries'] as $entry) {
          $hasTest = $logs->hasByCapturedLogIDAndMachineIDAndTest(
            $request['report_id'],
            $item['id'],
            $entry['test_number']
          );

          if ($hasTest) {
            // test exists, edit
            $logs->updateByCapturedLogIDAndMachineIDAndTest(
              [
                'time' => $getValueFromArrayIfExists($entry, 'time'),
                'was_test_passed' => $getValueFromArrayIfExists($entry, 'status'),
                'voltage' => $getValueFromArrayIfExists($entry, 'reading'),
                'potential_hydrogen' => $getValueFromArrayIfExists($entry, 'ph'),
                'reduction_potential' => $getValueFromArrayIfExists($entry, 'orp'),
                'temperature' => $getValueFromArrayIfExists($entry, 'temperature'),
                'total_chlorine' =>
                  $getValueFromArrayIfExists($entry, 'total_chlorine'),
                'free_chlorine' => 
                  $getValueFromArrayIfExists($entry, 'free_chlorine'),
                'rinse' => $getValueFromArrayIfExists($entry, 'rinse'),
                'product' => $getValueFromArrayIfExists($entry, 'product'),
                'lot' => $getValueFromArrayIfExists($entry, 'lot'),
                'crop' => $getValueFromArrayIfExists($entry, 'parcel'),
                'batch' => $getValueFromArrayIfExists($entry, 'reference'),
                'corrective_actions' => 
                  $getValueFromArrayIfExists($entry, 'corrective_action')
              ],
              $request['report_id'],
              $item['id'],
              $entry['test_number']
            );
          } else {
            // test doesn't exist, create new
            array_push($rows, [
              'capture_date_id' => $request['report_id'],
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
          $lastTestNumber = $entry['test_number'];
        }
        // delete entries higher than the last entry entered, since they were deleted in the frontend
        $logs->delete([
          'AND' => [
            'capture_date_id' => $request['report_id'],
            'machine_id' => $item['id'],
            'test_num[>]' => $lastTestNumber
          ]
        ]);
      }
      // add the new entries if there are any
      if (count($rows) !== 0) {
        $logs->insert($rows);
      }
    }
  ]
);

?>
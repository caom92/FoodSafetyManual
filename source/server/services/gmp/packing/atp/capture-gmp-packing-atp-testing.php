<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createCaptureService(
  'GMP',
  'Packing',
  'Environmental ATP Testing',
  [
    'areas' => [
      'type' => 'array',
      'values' => [
        'name' => [
          'type' => 'string',
          'min_length' => 2,
          'max_length' => 64
        ],
        'time' => [
          'type' => 'datetime',
          'format' => 'G:i'
        ],
        'items' => [
          'type' => 'array',
          'values' => [
            'test_number' => [
              'type' => 'int',
              'min' => 1
            ],
            'test1' => [
              'type' => 'float'
            ],
            'results1' => [
              'type' => 'bool'
            ],
            'corrective_action' => [
              'type' => 'string',
              'max_length' => 256,
              'optional' => true
            ],
            'test2' => [
              'type' => 'float',
              'optional' => true
            ],
            'results2' => [
              'type' => 'bool',
              'optional' => true
            ]
          ]
        ]
      ]
    ]
  ],
  [
    'extra_info' => [
      // NULL
    ],
    'function' => function($scope, $segment, $request, $logID) {
      // get an instance of the areas' DAO
      $areas = $scope->daoFactory->get('gmp\packing\atp\CheckAreas');
      $zoneID = $segment->get('zone_id');

      // then visit each area element
      foreach ($request['areas'] as $area) {
        // check if the area already exists on the DB
        $areaID = $areas->selectIDByNameAndZoneID(
          $area['name'], $zoneID);

        // if this is not the case, insert it
        if (!isset($areaID)) {
          $areaID = $areas->insert([
            'name' => $area['name'],
            'zone_id' => $zoneID
          ]);
        }

        // store in the database the area and time
        $timeLogID = $scope->daoFactory->get('gmp\packing\atp\TimeLogs')
          ->insert([
            'capture_date_id' => $logID,
            'area_id' => $areaID,
            'time' => $area['time']
          ]);

        // initialize the array for inserting the per-area items
        $items = [];

        // then visit each per-area item
        foreach ($area['items'] as $item) {
          // check if a 2nd test was performed
          $hasCorrectiveAction = 
            isset($item['corrective_action'])
            && array_key_exists('corrective_action', $item);
          $hasTest = 
            isset($item['test2'])
            && array_key_exists('test2', $item);
          $hasStatus = 
            isset($item['results2'])
            && array_key_exists('results2', $item);
          
          // push the item data to the items storage
          array_push($items, [
            'time_log_id' => $timeLogID,
            'test_num' => $item['test_number'],
            'test1' => $item['test1'],
            'was_test1_passed' => $item['results1'],
            'corrective_action' => ($hasCorrectiveAction) ?
              $item['corrective_action'] : NULL,
            'test2' => ($hasTest) ? $item['test2'] : NULL,
            'was_test2_passed' => ($hasStatus) ? $item['results2'] : NULL 
          ]);
        }

        // store the items to the database
        $scope->daoFactory->get('gmp\packing\atp\Logs')->insert($items);
      }
    }
  ]
);

?>
<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUpdateService(
  'GMP',
  'Packing',
  'Environmental ATP Testing',
  [
    'notes' => [
      'type' => 'string',
      'max_length' => 65535
    ],
    'areas' => [
      'type' => 'array',
      'values' => [
        'id' => [
          'type' => 'int',
          'min' => 1
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
              'max_length' => 65535,
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
      'notes',
    ],
    'function' => function($scope, $request) {
      foreach ($request['areas'] as $area) {
        $scope->daoFactory->get('gmp\packing\atp\TimeLogs')
          ->updateByCapturedLogID(
            ['time' => $area['time']], $request['report_id']
          );

        foreach ($area['items'] as $item) {
          $scope->daoFactory->get('gmp\packing\atp\Logs')
            ->updateByCapturedLogIDAndAreaID(
              [
                'test_num' => $item['test_number'],
                'test1' => $item['test1'],
                'was_test1_passed' => $item['results1'],
                'corrective_action' => (isset($item['corrective_action'])) ? 
                  $item['corrective_action'] : NULL,
                'test2' => (isset($item['test2'])) ? $item['test2'] : NULL,
                'was_test2_passed' => (isset($item['results2'])) ? 
                  $item['results2'] : NULL
              ],
              $request['report_id'],
              $area['id']
            );
        }
      }
    }
  ]
);

?>
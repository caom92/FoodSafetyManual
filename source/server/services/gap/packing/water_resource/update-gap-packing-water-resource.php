<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUpdateService(
  'GAP',
  'Fields',
  'Annual Water Resource Sanitary Survey Form',
  [
    'areas' => [
      'type' => 'array',
      'values' => [
        'items' => [
          'type' => 'array',
          'values' => [
            'id' => [
              'type' => 'int',
              'min' => 1
            ],
            'date' => [
              'type' => 'datetime',
              'format' => 'Y-m-d',
              'optional' => TRUE
            ],
            'compliance' => [
              'type' => 'bool',
              'optional' => TRUE
            ],
            'corrective_actions' => [
              'type' => 'string',
              'max_length' => 65535,
              'optional' => TRUE
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
    'function' => function($scope, $request) {
      $logs = $scope->daoFactory->get('gap\packing\waterResource\Logs');
      foreach ($request['areas'] as $area) {
        foreach ($area['items'] as $item) {
          $logs->updateByCapturedLogIDAndItemID(
            [
              'date' => (isset($item['date']) 
                && array_key_exists('date', $item)) ?
                  $item['date'] : NULL,
              'is_compliant' => (isset($item['compliance']) 
                && array_key_exists('compliance', $item)) ?
                  $item['compliance'] : NULL,
              'corrective_actions' => (isset($item['corrective_actions']) 
                && array_key_exists('corrective_actions', $item)) ?
                  $item['corrective_actions'] : NULL
            ],
            $request['report_id'],
            $item['id']
          );
        }
      }
    }
  ]
);

?>
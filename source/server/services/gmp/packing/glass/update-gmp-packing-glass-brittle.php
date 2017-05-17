<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUpdateService(
  'GMP',
  'Packing',
  'Glass & Brittle Plastic Inspection',
  [
    'areas' => [
      'type' => 'array',
      'values' => [
        'id' => [
          'type' => 'int',
          'min' => 1
        ],
        'items' => [
          'type' => 'array',
          'values' => [
            'id' => [
              'type' => 'int',
              'min' => 1
            ],
            'is_acceptable' => [
              'type' => 'bool'
            ]
          ]
        ]
      ]
    ]
  ],
  [
    'extra_info' => [
      'time',
      'notes'
    ],
    'function' => function($scope, $request) {
      $logs = $scope->daoFactory->get('gmp\packing\glass\Logs');
      foreach ($request['areas'] as $area) {
        foreach ($area['items'] as $item) {
          $logs->updateByCapturedDateIDAndAreaGlassID(
            [
              'is_acceptable' => $item['is_acceptable']
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
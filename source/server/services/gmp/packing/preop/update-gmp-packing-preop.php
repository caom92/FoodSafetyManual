<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor', 'Employee'],
    'has_privileges' => [
      'privilege' => ['Read','Write'],
      'program' => 'GMP',
      'module' => 'Packing',
      'log' => 'Pre-Operational Inspection'
    ],
    'report_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'notes' => [
      'type' => 'string',
      'max_length' => 65535
    ],
    'album_url' => [
      'type' => 'string',
      'max_length' => 255
    ],
    'areas' => [
      'type' => 'array',
      'values' => [
        'id' => [
          'type' => 'int',
          'min' => 1
        ],
        'notes' => [
          'type' => 'string',
          'optional' => true,
          'max_length' => 65535
        ],
        'person_performing_sanitation' => [
          'type' => 'string',
          'optional' => true,
          'max_length' => 255
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
            ],
            'corrective_action_id' => [
              'type' => 'int',
              'min' => 1
            ],
            'comment' => [
              'type' => 'string',
              'optional' => true,
              'max_length' => 65535
            ]
          ]
        ]
      ]
    ]
  ],
  'callback' => function($scope, $request) {
    // update the captured log info
    $scope->daoFactory->get('CapturedLogs')->updateByID(
      [
        'extra_info1' => $request['notes'],
        'extra_info2' => $request['album_url']
      ], 
      $request['report_id']
    );

    // for each area in the input array...
    foreach ($request['areas'] as $area) {
      // update the area log 
      $scope->daoFactory->get('gmp\packing\preop\AreaLogs')
        ->updateByCapturedLogIDAndAreaID(
          [
            'notes' => $area['notes'],
            'person_performing_sanitation' => 
              $area['person_performing_sanitation']
          ],
          $request['report_id'],
          $area['id']
        );

      // the for each item in the area
      foreach ($area['items'] as $item) {
        // update the item log
        $scope->daoFactory->get('gmp\packing\preop\ItemLogs')
          ->updateByCapturedLogIDAndItemID(
            [
              'is_acceptable' => $item['is_acceptable'],
              'corrective_action_id' => $item['corrective_action_id'],
              'comment' => $item['comment']
            ],
            $request['report_id'],
            $item['id']
          );
      }
    }
  }
];

?>
<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor', 'Employee'],
    'has_privileges' => [
      'privilege' => ['Read','Write'],
      'program' => 'GAP',
      'module' => 'Fields',
      'log' => 'Pre Operativo Diario'
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
              'type' => 'bool',
              'optional' => TRUE
            ],
            'corrective_action_id' => [
              'type' => 'int',
              'min' => 1,
              'optional' => TRUE
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
      $scope->daoFactory->get('gap\packing\preop\AreaLogs')
        ->updateByCapturedLogIDAndAreaID(
          [
            'notes' => 
              (isset($area['notes']) && array_key_exists('notes', $area)) ? 
                $area['notes'] : NULL,
            'person_performing_sanitation' => 
              (isset($area['person_performing_sanitation']) 
              && array_key_exists('person_performing_sanitation', $area)) ? 
                $area['person_performing_sanitation'] : NULL
          ],
          $request['report_id'],
          $area['id']
        );

      // the for each item in the area
      foreach ($area['items'] as $item) {
        // update the item log
        $scope->daoFactory->get('gap\packing\preop\ItemLogs')
          ->updateByCapturedLogIDAndItemID(
            [
              'is_acceptable' => 
                (isset($item['is_acceptable']) 
                && array_key_exists('is_acceptable', $item)) ? 
                  $item['is_acceptable'] : "NULL",
              'corrective_action_id' => (isset($item['corrective_action_id']) 
                && array_key_exists('corrective_action_id', $item)) ? 
                  $item['corrective_action_id'] 
                  : $scope->daoFactory
                    ->get('gap\packing\preop\CorrectiveActions')
                    ->getOptionNoneID(),
              'comment' => 
                (isset($item['comment']) 
                && array_key_exists('comment', $item)) ? $item['comment'] : NULL
            ],
            $request['report_id'],
            $item['id']
          );
      }
    }
  }
];

?>
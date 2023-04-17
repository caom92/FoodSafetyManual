<?php

require_once realpath(dirname(__FILE__).'/../../../../service_creators.php');

$service = fsm\createCaptureService(
  'GAP',
  'Fields',
  'Master Sanitation Schedule',
  [
    'areas' => [
      'type' => 'array',
      'values' => [
        'id' => [
          'type' => 'int',
          'min' => 1
        ],
        'time' => [
          'type' => 'datetime',
          'format' => 'G:i',
          'optional' => true
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
            'status' => [
              'type' => 'bool',
              'optional' => true
            ],
            'corrective_action' => [
              'type' => 'string',
              'optional' => true,
              'max_length' => 65535
            ],
            'notes' => [
              'type' => 'string',
              'optional' => true,
              'max_length' => 65535
            ]
          ]
        ]
      ]
    ]
  ],
  [
    'extra_info' => [
      'notes',
      'album_url'
    ],
    'function' => function($scope, $segment, $request, $logID) {
      $areasLogs = $scope->daoFactory->get('gap\packing\masterSanitation\AreasLogs');
      $checksLogs = $scope->daoFactory->get('gap\packing\masterSanitation\ChecksLogs');

      $checksEntries = [];

      // Insert each area, one at a time
      foreach ($request['areas'] as $area) {
        $areaID = $areasLogs->insert([
          'capture_date_id' => $logID,
          'area_id' => $area['id'],
          'time' => (isset($area['time']) && array_key_exists('time', $area)) ? $area['time'] : NULL,
          'notes' => (isset($area['notes']) && array_key_exists('notes', $area)) ? $area['notes'] : NULL,
          'person_performing_sanitation' => (isset($area['person_performing_sanitation']) && array_key_exists('person_performing_sanitation', $area)) ? $area['person_performing_sanitation'] : NULL
        ]);

        foreach ($area['items'] as $item) {
          array_push($checksEntries, [
            'area_log_id' => $areaID,
            'check_id' => $item['id'],
            'status' => (isset($item['status']) && array_key_exists('status', $item)) ? $item['status'] : NULL,
            'corrective_action' => (isset($item['corrective_action']) && array_key_exists('corrective_action', $item)) ? $item['corrective_action'] : NULL,
            'notes' => (isset($item['notes']) && array_key_exists('notes', $item)) ? $item['notes'] : NULL
          ]);
        }
      }

      $insertedRows = $checksLogs->insert($checksEntries);

      return $insertedRows;
    }
  ],
  FALSE,
  TRUE
);

?>

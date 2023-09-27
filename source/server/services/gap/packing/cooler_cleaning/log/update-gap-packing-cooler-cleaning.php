<?php

require_once realpath(dirname(__FILE__).'/../../../../service_creators.php');

$service = fsm\createUpdateService(
  'GAP',
  'Fields',
  'Cooler Cleaning Log',
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
    'function' => function($scope, $request) {
      $areasLogs = $scope->daoFactory->get('gap\packing\coolerCleaning\AreasLogs');
      $checksLogs = $scope->daoFactory->get('gap\packing\coolerCleaning\ChecksLogs');

      $logData = [];

      // Update each area, one at a time
      foreach ($request['areas'] as $area) {
        $areasLogs->updateByCapturedLogIDAndAreaID([
          'time' => (isset($area['time']) && array_key_exists('time', $area)) ? $area['time'] : NULL,
          'notes' => (isset($area['notes']) && array_key_exists('notes', $area)) ? $area['notes'] : NULL,
          'person_performing_sanitation' => (isset($area['person_performing_sanitation']) && array_key_exists('person_performing_sanitation', $area)) ? $area['person_performing_sanitation'] : NULL
        ], $request['report_id'], $area['id']);

        foreach ($area['items'] as $item) {
          $checksLogs->updateByCapturedLogIDAndCheckID([
            'status' => (isset($item['status']) && array_key_exists('status', $item)) ? $item['status'] : NULL,
            'corrective_action' => (isset($item['corrective_action']) && array_key_exists('corrective_action', $item)) ? $item['corrective_action'] : NULL,
            'notes' => (isset($item['notes']) && array_key_exists('notes', $item)) ? $item['notes'] : NULL
          ], $request['report_id'], $item['id']);
        }
      }
    }
  ],
  FALSE,
  TRUE
);

?>

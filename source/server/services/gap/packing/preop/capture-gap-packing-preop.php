<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createCaptureService(
  'GAP',
  'Packing',
  'Pre-Operational Inspection',
  [
    'areas' => [
      'type' => 'array',
      'values' => [
        'time' => [
          'type' => 'datetime',
          'format' => 'G:i'
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
  [
    'extra_info' => [
       'notes',
       'album_url'
    ],
    'function' => function($scope, $segment, $request, $logID) {
      // create a temporal storage for the many entries to be inserted in
      // the per item log
      $itemsLogEntries = [];

      // insert each per area log entry one at the time...
      foreach ($request['areas'] as $areaLogEntry) {
        // save the resulting ID for later use
        $areaID = $scope->daoFactory->get('gap\packing\preop\AreaLogs')
          ->insert([
            'capture_date_id' => $logID,
            'time' => $areaLogEntry['time'],
            'notes' => $areaLogEntry['notes'],
            'person_performing_sanitation' =>
              $areaLogEntry['person_performing_sanitation']
          ]);

        // then store each per item log entry in the temporal storage
        foreach ($areaLogEntry['items'] as $itemsLogEntry) {
          array_push($itemsLogEntries, [
            'area_log_id' => $areaID,
            'item_id' => $itemsLogEntry['id'],
            'is_acceptable' => $itemsLogEntry['is_acceptable'],
            'corrective_action_id' =>
              $itemsLogEntry['corrective_action_id'],
            'comment' => $itemsLogEntry['comment']
          ]);
        }
      }

      // finally, store all the per item log entries in the data base in a
      // single query
      return $scope->daoFactory->get('gap\packing\preop\ItemLogs')
        ->insert($itemsLogEntries);
    }
  ]
);

?>
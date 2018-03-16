<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createCaptureService(
  'GAP',
  'Fields',
  'Organic Program Verification & SRRC',
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
            'area_id' => $areaLogEntry['id'],
            'time' => $areaLogEntry['time'],
            'notes' => (isset($areaLogEntry['notes']) 
              && array_key_exists('notes', $areaLogEntry)) ?
                $areaLogEntry['notes'] : NULL,
            'person_performing_sanitation' => 
              (isset($areaLogEntry['person_performing_sanitation']) 
                && array_key_exists(
                  'person_performing_sanitation', 
                  $areaLogEntry)
              ) ?
                $areaLogEntry['person_performing_sanitation'] : NULL
          ]);

        // then store each per item log entry in the temporal storage
        foreach ($areaLogEntry['items'] as $itemsLogEntry) {
          $hasAcceptableValue = 
            isset($itemsLogEntry['is_acceptable']) 
            && array_key_exists('is_acceptable', $itemsLogEntry);
        
          $isAcceptable = NULL;
          if ($hasAcceptableValue) {
            if ($itemsLogEntry['is_acceptable'] === 'null') {
              $isAcceptable = NULL;
            }
          }

          array_push($itemsLogEntries, [
            'area_log_id' => $areaID,
            'item_id' => $itemsLogEntry['id'],
            'is_acceptable' => $isAcceptable,
            'corrective_action_id' => 
              (isset($itemsLogEntry['corrective_action_id']) 
                && array_key_exists('corrective_action_id', $itemsLogEntry)) ? 
                  $itemsLogEntry['corrective_action_id'] : 
                  $scope->daoFactory->get('gap\packing\preop\CorrectiveActions')
                    ->getOptionNoneID(),
            'comment' => 
              (isset($itemsLogEntry['comment']) 
                && array_key_exists('comment', $itemsLogEntry)) ? 
                  $itemsLogEntry['comment'] : NULL
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
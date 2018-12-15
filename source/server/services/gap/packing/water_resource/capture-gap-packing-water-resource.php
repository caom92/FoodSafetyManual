<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createCaptureService(
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
            'reason' => [
              'type' => 'string',
              'max_length' => 65535,
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
    'function' => function($scope, $segment, $request, $logID) {
      // prepare the array of rows to insert to the database
      $rows = [];

      // visit each area
      foreach ($request['areas'] as $area) {
        // visit each item
        foreach ($area['items'] as $item) {
          // and store its information in the row array
          array_push($rows, [
            'capture_date_id' => $logID,
            'item_id' => $item['id'],
            //'date' => $item['date'],
            'date' => (isset($item['date']) 
              && array_key_exists('date', $item)) ?
                $item['date'] : NULL,
            'is_compliant' => (isset($item['compliance']) 
              && array_key_exists('compliance', $item)) ?
                $item['compliance'] : NULL,
            'reason' => (isset($item['reason']) 
              && array_key_exists('reason', $item)) ?
                $item['reason'] : NULL,
            'corrective_actions' => (isset($item['corrective_actions']) 
              && array_key_exists('corrective_actions', $item)) ?
                $item['corrective_actions'] : NULL
          ]); 
        }
      }

      // finally, insert all the rows to the database
      return $scope->daoFactory->get('gap\packing\waterResource\Logs')
        ->insert($rows);
    }
  ],
  FALSE,
  TRUE
);

?>
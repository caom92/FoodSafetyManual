<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUpdateService(
  'GAP',
  'Others',
  'Daily Notice of Unusual Occurrence and Corrective Action Report',
  [
    'incident_date' => [
      'type' => 'datetime',
      'format' => 'Y-m-d'
    ],
    'time' => [
      'type' => 'datetime',
      'format' => 'G:i'
    ],
    'shift_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'area_id' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 255
    ],
    'product_id' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 255
    ],
    'batch' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 255
    ],
    'description' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 65535
    ],
    'corrective_action' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 65535
    ],
    'album_url' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 255
    ],
  ],
  [
    'extra_info' => NULL,
    'function' => function($scope, $request) {
      $scope->daoFactory->get('gap\others\unusualOccurrence\Logs')
        ->updateByCapturedLogID([
          'incident_date' => $request['incident_date'],
          'time' => $request['time'],
          'shift_id' => $request['shift_id'],
          'production_area_id' => $request['area_id'],
          'product_id' => $request['product_id'],
          'batch' => $request['batch'],
          'description' => $request['description'],
          'corrective_action' => $request['corrective_action'],
          'album_url' => $request['album_url']
        ], $request['report_id']);
    }
  ]
);

?>
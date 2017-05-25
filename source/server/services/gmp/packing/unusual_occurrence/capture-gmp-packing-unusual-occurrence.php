<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createCaptureService(
  'GMP',
  'Packing',
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
      'type' => 'int',
      'min' => 1
    ],
    'product_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'batch' => [
      'type' => 'int',
      'min' => 1
    ],
    'description' => [
      'type' => 'string',
      'min_length' => 2,
      'max_length' => 256
    ],
    'corrective_action' => [
      'type' => 'string',
      'min_length' => 2,
      'max_length' => 128
    ],
    'album_url' => [
      'type' => 'string',
      'min_length' => 2,
      'max_length' => 256
    ],
  ],
  [
    'extra_info' => [
      // NULL
    ],
    'function' => function($scope, $segment, $request, $logID) {
      return $scope->daoFactory->get('unusualOccurrence\Logs')
        ->insert([
          'capture_date_id' => $logID,
          'incident_date' => $request['incident_date'],
          'time' => $request['time'],
          'shift_id' => $request['shift_id'],
          'production_area_id' => $request['area_id'],
          'product_id' => $request['product_id'],
          'batch' => $request['batch'],
          'description' => $request['description'],
          'corrective_action' => $request['corrective_action'],
          'album_url' => $request['album_url']
        ]);
    }
  ]
);

?>
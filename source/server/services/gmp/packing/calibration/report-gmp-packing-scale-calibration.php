<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = fsm\createReportService(
  'GMP',
  'Packing',
  'Daily Scale Calibration Check',
  [
    'items_name' => 'types',
    'extra_info' => [
      'notes',
      'corrective_action'
    ],
    'function' => function($scope, $segment, $logDate) {
      // select all the per scale type log data
      $logs = $scope->daoFactory->get('gmp\packing\calibration\TimeLogs')
        ->selectByCaptureDateID($logDate['id']);

      // initialize the storage for the per scale type logs
      $scaleTypeLogs = [];

      $scaleLogs = [
        'id' => 0
      ];

      // visit each per scale log data to store it in a separate array
      foreach ($logs as $log) {
        // check if the scale type changed
        $hasTypeChanged = $scaleLogs['id'] != $log['type_id'];
        if ($hasTypeChanged) {
          // if the scale type changed, check if we already have log info.
          // waiting to be stored 
          if ($scaleLogs['id'] != 0) {
            // if we do, store it in the final array
            array_push($scaleTypeLogs, $scaleLogs);
          } 

          // create a new temporal storage for the logs of the current 
          // scale type
          $scaleLogs = [
            'id' => $log['type_id'],
            'name' => $log['type_name'],
            'time' => $log['time'],
            'items' => [[
              'order' => $log['order'],
              'name' => $log['scale_name'],
              'test' => $log['test'],
              'status' => $log['status'],
              'is_sanitized' => $log['is_sanitized']
            ]]
          ];
        } else {
          // if the scale type has not change, push the current log
          // data to the array of logs for the current scale type
          array_push($scaleLogs['items'], [
            'order' => $log['order'],
            'name' => $log['scale_name'],
            'test' => $log['test'],
            'status' => $log['status'],
            'is_sanitized' => $log['is_sanitized']
          ]);
        }
      }

      // push the last entries to the final storage
      if ($scaleLogs['id'] != 0) {
        array_push($scaleTypeLogs, $scaleLogs);
      }

      return $scaleTypeLogs;
    }
  ]
);

?>
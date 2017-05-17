<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createLogService(
  'GMP',
  'Packing',
  'Daily Scale Calibration Check',
  [
    'items_name' => 'types',
    'function' => function($scope, $segment) {
      // then get the data from the table
      $rows = $scope->scales->selectActiveByZoneID($segment->get('zone_id'));

      // initialize the temporal storage for the list of scales 
      $scaleList = [];

      // initialize the temporal storage for the data of each scale
      $scaleData = [
        'id' => 0
      ];

      // visit each row that was read from the table
      foreach ($rows as $row) {
        // check if the scale type changed
        $hasTypeChanged = $scaleData['id'] != $row['type_id'];
        if ($hasTypeChanged) {
          // if the scale type changed, check if we already have scale info.
          // waiting to be stored 
          if ($scaleData['id'] != 0) {
            // if we do, store it in the final array
            array_push($scaleList, $scaleData);
          } 

          // create a new temporal storage for the logs of the current 
          // scale type
          $scaleData = [
            'id' => $row['type_id'],
            'name' => $row['type_name'],
            'items' => [[
              'id' => $row['id'],
              'name' => $row['name'],
              'order' => $row['order']
            ]]
          ];
        } else {
          // if the scale type has not change, push the current scale
          // data to the list of scales for the current scale type
          array_push($scaleData['items'], [
            'id' => $row['id'],
            'name' => $row['name'],
            'order' => $row['order']
          ]);
        }
      }

      // push the last elements to the list of scales
      if ($scaleData['id'] != 0) {
        array_push($scaleList, $scaleData);
      }

      return $scaleList;
    }
  ]
);

?>
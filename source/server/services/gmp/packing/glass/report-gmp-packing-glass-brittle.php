<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = fsm\createReportService(
  'GMP',
  'Packing',
  'Glass & Brittle Plastic Inspection',
  [
    'items_name' => 'areas',
    'extra_info' => [
      'time',
      'notes'
    ],
    'function' => function($scope, $segment, $logDate) {
      // retrieve the per group log corresponding to this date
      $rows = $scope->daoFactory->get('gmp\packing\glass\Logs')
        ->selectByCaptureDateID($logDate['id']);

      // final array where the working areas are going to be stored
      $areas = [];

      // temporary storage for a single working area
      $area = [
        'id' => 0,
        'name' => '',
        'items' => []
      ];

      // [***]
      // visit each row of items retrieved from the database
      foreach ($rows as $row) {
        // check if the working area has changed
        $hasAreaChanged = $row['area_id'] != $area['id'];
        if ($hasAreaChanged) {
          // if it has, first, check if the current working area info is not 
          // empty
          if ($area['id'] != 0) {
            // if it's not, then push it to the final array
            array_push($areas, $area);
          }

          // then, store the new item, item type and working area info in 
          // their corresponding temporal storage 
          $area = [
            'id' => $row['area_id'],
            'name' => $row['area_name'],
            'items' => [[
              'id' => $row['item_id'],
              'name' => $row['item_name'],
              'order' => $row['item_order'],
              'quantity' => $row['item_quantity'],
              'status' => $row['item_status']
            ]]
          ];
        } else {
          // if the current area has not changed, then push the 
          // new item info to the current area's temporal storage
          array_push($area['items'], [
            'id' => $row['item_id'],
            'name' => $row['item_name'],
            'order' => $row['item_order'],
            'quantity' => $row['item_quantity'],
            'status' => $row['item_status']
          ]);
        } // if ($hasAreaChanged)
      } // foreach ($rows as $row)

      // don't forget to push the last entries to the the end of the array
      if ($area['id'] != 0) {
        array_push($areas, $area);
      }

      return $areas;
    }
  ]
);

?>
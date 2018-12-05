<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createReportService(
  'GAP',
  'Fields',
  'Annual Water Resource Sanitary Survey Form',
  [
    'items_name' => 'areas',
    'extra_info' => [
      // NULL
    ],
    'function' => function($scope, $segment, $logDate) {
      // first, get the list of all active items
      $items = 
        $scope->daoFactory->get('gap\packing\waterResource\Logs')
          ->selectByCaptureDateID(
            $logDate['id']
          );

      // then initialize the area array
      $areas = [];

      // initialize temporal storage where the current area data will
      // be stored
      $area = [
        'id' => 0
      ];

      // visit each item read from the database
      foreach ($items as $item) {
        // check if the area that we are currently working with has
        // changed
        $hasRoomChanged = $item['area_id'] != $area['id'];
        if ($hasRoomChanged) {
          // if it has, push the current area to the final areas 
          // storage if its data is not empty
          if ($area['id'] != 0) {
            array_push($areas, $area);
          }

          // then, prepare a new temporal storage for the current
          // area and add the current item
          $area = [
            'id' => $item['area_id'],
            'name' => $item['area_name'],
            'items' => [
              [
                'id' => $item['id'],
                'name' => $item['name'],
                'date' => $item['date'],
                'compliance' => $item['compliance'],
                'corrective_actions' => $item['corrective_actions']
              ]
            ]
          ];
        } else {
          // if the area has not change, then just add the item
          array_push($area['items'], [
            'id' => $item['id'],
            'name' => $item['name'],
            'date' => $item['date'],
            'compliance' => $item['compliance'],
            'corrective_actions' => $item['corrective_actions']
          ]);
        }
      }

      // don't forget to save the last area data in the
      // final storage
      if ($area['id'] != 0) {
        array_push($areas, $area);
      }

      // return the resulting array
      return $areas;
    }
  ]
);

?>
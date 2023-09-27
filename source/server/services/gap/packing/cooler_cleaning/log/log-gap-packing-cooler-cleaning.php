<?php

require_once realpath(dirname(__FILE__).'/../../../../service_creators.php');


$service = fsm\createLogService(
  'GAP',
  'Fields',
  'Cooler Cleaning Log',
  [
    'items_name' => 'areas',
    'function' => function($scope, $segment) {
      $rows = $scope->daoFactory->get('gap\packing\coolerCleaning\Checks')
        ->selectByZoneID($segment->get('zone_id'));

      // final array where the working areas are going to be stored
      $areas = [];

      // temporary storage for a single working area
      $area = [
        'id' => 0,
        'name' => '',
        'types' => []
      ];

      // temporary storage for a single item type
      $type = [
        'id' => 0,
        'name' => '',
        'items' => []
      ];

      // for each row obtained from the data base...
      foreach ($rows as $row) {
        // check if the working area has changed
        $hasAreaChanged = $row['area_id'] != $area['id'];
        if ($hasAreaChanged) {
          // if it has, first, check if the current working area info is not 
          // empty
          if ($area['id'] != 0) {
            // if it's not, then push it to the final array
            array_push($area['types'], $type);
            array_push($areas, $area);
          }

          // then, store the new item, item type and working area info in 
          // their corresponding temporal storage 
          $item = [
            'id' => $row['item_id'],
            'name' => $row['item_name'],
            'order' => $row['item_order']
          ];
          $type = [
            'id' => $row['type_id'],
            'name' => $row['type_name'],
            'items' => [ $item ]
          ];
          $area = [
            'id' => $row['area_id'],
            'name' => $row['area_name'],
            'types' => []
          ];
        } else {
          // if the current working area has not changed, check if the 
          // current item type group has
          $hasTypeChanged = $row['type_id'] != $type['id'];
          if ($hasTypeChanged) {
            // if it has, push the current item type info to the current 
            // working area temporal storage
            array_push($area['types'], $type);

            // then store the new item and item type info in their 
            // corresponding temporal storage
            $item = [
              'id' => $row['item_id'],
              'name' => $row['item_name'],
              'order' => $row['item_order']
            ];
            $type = [
              'id' => $row['type_id'],
              'name' => $row['type_name'],
              'items' => [ $item ]
            ];
          } else {
            // if the current item type info has not changed, then push the 
            // new item info to the current item type info temporal storage
            array_push($type['items'], [
              'id' => $row['item_id'],
              'name' => $row['item_name'],
              'order' => $row['item_order']
            ]);
          }   // if ($hasTypeChanged)
        } // if ($hasAreaChanged)
      } // foreach ($rows as $row)

      // don't forget to push the last entries to the final array
      if ($type['id'] != 0) {
        array_push($area['types'], $type);
      }

      if ($area['id'] != 0) {
        array_push($areas, $area);
      }

      return [
        'areas' => $areas
      ];
    },
    'organization' => [
      'areas'
    ]
  ],
  FALSE,
  TRUE
);

?>
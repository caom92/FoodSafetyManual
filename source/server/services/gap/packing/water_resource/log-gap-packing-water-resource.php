<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createLogService(
  'GAP',
  'Fields',
  'Annual Water Resource Sanitary Survey Form',
  [
    'items_name' => 'areas',
    'function' => function($scope, $segment) {
      $rows = 
        $scope->daoFactory->get('gap\packing\waterResource\Items')
          ->selectActiveByZoneID($segment->get('zone_id'));

      // final array where the working areas are going to be stored
      $areas = [];

      // temporary storage for a single area
      $area = [
        'id' => 0,
        'name' => '',
        'items' => []
      ];

      foreach ($rows as $row) {
        $hasAreaChanged = $row['area_id'] != $area['id'];
        if ($hasAreaChanged) {
          if ($area['id'] != 0) {
            array_push($areas, $area);
          }

          $area = [
            'id' => $row['area_id'],
            'name' => $row['area_name'],
            'items' => [[
              'id' => $row['id'],
              'name' => $row['name']
            ]]
          ];
        } else {
          array_push(
            $area['items'], [
              'id' => $row['id'],
              'name' => $row['name']
            ]
          );
        }
      }

      if ($area['id'] != 0) {
        array_push($areas, $area);
      }

      return $areas;
    }
  ]
);

?>
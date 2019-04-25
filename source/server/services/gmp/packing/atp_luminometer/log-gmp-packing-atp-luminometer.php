<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createLogService(
  'GMP',
  'Packing',
  'ATP SystemSURE Luminometer',
  [
    'items_name' => 'items',
    'function' => function($scope, $segment) {
      $items = $scope->daoFactory->get('gmp\packing\atpLuminometer\Items')
        ->selectActiveByZoneID($segment->get('zone_id'));
      
      $types = $scope->daoFactory->get('gmp\packing\atpLuminometer\Types')
        ->selectAll();
      
      foreach ($items as &$item) {
        $item['weeks'] = [
          [
            'week_num' => 1,
            'types' => []
          ]
        ];
        foreach ($types as $type) {
          $tempType = [
            'id' => $type['id'],
            'name_en' => $type['name_en'],
            'name_es' => $type['name_es'],
            'tests' => [
              [
                'test_num' => 1
              ],
              [
                'test_num' => 2
              ],
              [
                'test_num' => 3
              ]
            ]
          ];
          array_push($item['weeks'][0]['types'], $tempType);
        }
      }

      return $items;
    }
  ]
);

?>
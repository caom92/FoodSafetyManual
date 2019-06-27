<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createLogService(
  'GMP',
  'Packing',
  'Harvest Tool Accountability Program And Sanitizing Log',
  [
    'items_name' => 'days',
    'function' => function($scope, $segment) {
      $days = array();

      $types = $scope->daoFactory->get('gmp\packing\harvestTool\Types')->selectAll();

      $day = [
        'date' => '',
        'day_num' => 1,
        'types' => []
      ];

      foreach ($types as $type) {
        $tempType = [
          'type_id' => $type['id'],
          'name_en' => $type['name_en'],
          'name_es' => $type['name_es']
        ];
        array_push($day['types'], $tempType);
      }

      array_push($days, $day);

      return $days;
    }
  ]
);

?>
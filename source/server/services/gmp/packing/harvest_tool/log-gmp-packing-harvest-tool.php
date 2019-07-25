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

      $tools = $scope->daoFactory->get('gmp\packing\harvestTool\Tools')->selectActiveByZoneID($segment->get('zone_id'));

      $day = [
        'date' => '',
        'day_num' => 1,
        'tools' => []
      ];

      foreach ($tools as $tool) {
        $tempTool = [
          'tool_id' => $tool['id'],
          'name' => $tool['name']
        ];
        array_push($day['tools'], $tempTool);
      }

      array_push($days, $day);

      return $days;
    }
  ]
);

?>
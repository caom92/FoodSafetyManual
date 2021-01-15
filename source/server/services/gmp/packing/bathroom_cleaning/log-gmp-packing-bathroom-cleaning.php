<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createLogService(
  'GMP',
  'Packing',
  'Bathroom Cleaning Record',
  [
    'items_name' => 'days',
    'function' => function($scope, $segment) {
      $days = array();

      $items = $scope->daoFactory->get('gmp\packing\bathroomCleaning\Items')->selectActiveByZoneID($segment->get('zone_id'));

      $day = [
        'date' => '',
        'time' => '',
        'initials' => '',
        'day_num' => 1,
        'items' => []
      ];

      foreach ($items as $item) {
        $tempItem = [
          'item_id' => $item['id'],
          'name' => $item['name']
        ];
        array_push($day['items'], $tempItem);
      }

      array_push($days, $day);

      return $days;
    }
  ]
);

?>
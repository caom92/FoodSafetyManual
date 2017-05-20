<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createLogService(
  'GMP',
  'Packing',
  'Daily Notice of Unusual Occurrence and Corrective Action Report',
  [
    'items_name' => 'items',
    'function' => function($scope, $segment) {
      $areas = $scope->daoFactory->get('WorkingAreas')->selectByZoneID(
        $segment->get('zone_id')
      );
      $shifts = $scope->daoFactory->get('Shifts')->selectAll();
      $products = $scope->daoFactory->get('Products')->selectAll();
      return [
        'shifts' => $shifts,
        'products' => $products,
        'areas' => $areas
      ];
    }
  ]
);

?>
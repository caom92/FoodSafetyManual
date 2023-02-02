<?php

require_once realpath(dirname(__FILE__).'/../../../../../service_creators.php');


$service = fsm\createAddService(
  'GAP',
  'Fields',
  'Master Sanitation Schedule',
  [
    'area_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'type_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'name' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 65535
    ]
  ],
  function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $zoneID = $segment->get('zone_id');
    $items = $scope->daoFactory->get('gap\packing\masterSanitation\Checks');

    // TODO: Agregar alguna validación similar a verificar si el nombre está duplicado dentro de la misma zona

    $count = $items->countByAreaAndTypeIDs(
      $request['area_id'],
      $request['type_id']
    );

    return $items->insert([
      'area_id' => $request['area_id'],
      'type_id' => $request['type_id'],
      'is_active' => TRUE,
      'position' => $count + 1,
      'name' => $request['name']
    ]);
  }
);

?>

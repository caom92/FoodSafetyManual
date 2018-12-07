<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createAddService(
  'GAP',
  'Fields',
  'Annual Water Resource Sanitary Survey Form',
  [
    'area_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'name' => [
      'type' => 'string',
      'max_length' => 255
    ]
  ],
  function($scope, $request) {
    $items = $scope->daoFactory->get('gap\packing\waterResource\Items');
    $numItemsInArea = $items->countByAreaID($request['area_id']);

    return $items->insert([
      'area_id' => $request['area_id'],
      'is_active' => TRUE,
      'position' => $numItemsInArea + 1,
      'name' => $request['name']
    ]);
  }
);

?>
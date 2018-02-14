<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createAddService(
  'GMP',
  'Packing',
  'Glass & Brittle Plastic Inspection',
  [
    'area_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'name' => [
      'type' => 'string',
      'max_length' => 255
    ],
    'quantity' => [
      'type' => 'int',
      'min' => 1
    ]
  ],
  function($scope, $request) {
    // count the number of items in this area
    // so we can compute the position of this item and add it
    // in the last position
    $glass = $scope->daoFactory->get('gmp\packing\glass\AreaGlass');
    $numItemsInArea = $glass->countByAreaID($request['area_id']);

    // store the item in the data base 
    return $glass->insert([
      'area_id' => $request['area_id'],
      'is_active' => TRUE,
      'position' => $numItemsInArea + 1,
      'quantity' => $request['quantity'],
      'name' => $request['name']
    ]);
  }
);

?>
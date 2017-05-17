<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createAddService(
  'GMP',
  'Packing',
  'Pre-Operational Inspection',
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
      'max_length' => 64
    ]
  ],
  function($scope, $request) {
    // count the number of items in this area
    // so we can compute the position of this item and add it
    // in the last position
    $items = $scope->daoFactory->get('gmp\packing\preop\Items');
    $numItemsInArea = $items->countByAreaAndTypeIDs(
      $request['area_id'],
      $request['type_id']
    );

    // store the item in the data base 
    return $items->insert([
      'area_id' => $request['area_id'],
      'type_id' => $request['type_id'],
      'is_active' => TRUE,
      'position' => $numItemsInArea + 1,
      'name' => $request['name']
    ]);
  }
);

?>
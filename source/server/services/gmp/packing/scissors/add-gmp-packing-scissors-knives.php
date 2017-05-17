<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createAddService(
  'GMP',
  'Packing',
  'Daily Scissors & Knives Inspection',
  [
    'name' => [
      'type' => 'string',
      'max_length' => 64
    ],
    'quantity' => [
      'type' => 'int',
      'min' => 1
    ]
  ],
  function($scope, $request) {
    // first we get the session segment
    $segment = $scope->session->getSegment('fsm');

    // store the item in the data base 
    return $scope->daoFactory->get('gmp\packing\scissors\Groups')
      ->insert([
        'zone_id' => $segment->get('zone_id'),
        'is_active' => TRUE,
        'quantity' => $request['quantity'],
        'name' => $request['name']
      ]);
  }
);

?>
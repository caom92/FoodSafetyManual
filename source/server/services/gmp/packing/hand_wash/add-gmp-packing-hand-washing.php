<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = fsm\createAddService(
  'GMP',
  'Packing',
  'Daily Hand Washing Inspection',
  [
     'name' => [
        'type' => 'string'
      ]
  ],
  function($scope, $request) {
    // first we get the session segment
    $segment = $scope->session->getSegment('fsm');

    // store the item in the data base 
    return $scope->daoFactory->get('gmp\packing\handWash\Characteristics')
      ->insert([
        'zone_id' => $segment->get('zone_id'),
        'is_active' => TRUE,
        'name' => $request['name']
      ]);
  }
);

?>
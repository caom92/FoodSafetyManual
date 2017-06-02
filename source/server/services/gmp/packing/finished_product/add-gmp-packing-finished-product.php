<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createAddService(
  'GMP',
  'Packing',
  'Daily Finished Product Check',
  [
    'name' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 255
    ]
  ],
  function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    return $scope->daoFactory
      ->get('gmp\packing\finishedProduct\ProductionAreas')->insert([
        'zone_id' => $segment->get('zone_id'),
        'name' => $request['name']
      ]);
  }
);

?>
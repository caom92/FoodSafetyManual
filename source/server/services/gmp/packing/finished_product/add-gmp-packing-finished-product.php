<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createAddService(
  'GMP',
  'Packing',
  'Daily Finished Product Check',
  [
    'name' => [
      'type' => 'string',
      'min_length' => 2,
      'max_length' => 64
    ]
  ],
  function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    return $scope->daoFactory
      ->get('gmp\packing\finishedProduct\productionAreas')->insert([
        'zone_id' => $segment->get('zone_id'),
        'name' => $request['name']
      ]);
  }
);

?>
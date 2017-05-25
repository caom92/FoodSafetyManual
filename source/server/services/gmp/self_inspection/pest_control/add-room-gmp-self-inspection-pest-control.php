<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor'],
    'has_privileges' => [
      'privilege' => 'Read',
      'program' => 'GMP',
      'module' => 'Self Inspection',
      'log' => 'Pest Control'
    ],
    'name' => [
      'type' => 'string',
      'min_length' => 2,
      'max_length' => 32
    ]
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    return  $scope->daoFactory->get('gmp\selfInspection\pestControl\Rooms')
      ->insert([
        'zone_id' => $segment->get('zone_id'),
        'name' => $request['name']
      ]);
  }
];

?>
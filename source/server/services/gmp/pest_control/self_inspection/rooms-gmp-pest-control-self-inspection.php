<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor'],
    'has_privileges' => [
      'privilege' => 'Read',
      'program' => 'GMP',
      'module' => 'Pest Control',
      'log' => 'Self Inspection'
    ]
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    return $scope->daoFactory->get('pestControl\SelfInspection\Rooms')
      ->selectByZoneID($segment->get('zone_id'));
  }
];

?>
<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor'],
    'has_privileges' => [
      'privilege' => 'Read',
      'program' => 'GAP',
      'module' => 'Self Inspection',
      'log' => 'Pest Control & Log'
    ]
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    return $scope->daoFactory->get('gap\selfInspection\pestControl\Rooms')
      ->selectByZoneID($segment->get('zone_id'));
  }
];

?>
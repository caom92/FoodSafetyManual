<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Director']
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $zoneId = $segment->get('zone_id');
    $rows = $scope->daoFactory->get('MenuFiles')->selectByZoneId($zoneId);

    return $rows;
  }
];

?>
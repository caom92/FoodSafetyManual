<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor', 'Manager', 'Director']
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $cropRegistryLogs = $scope->daoFactory->get('cropRegistry\Logs');
    $zoneID = $segment->get('zone_id');

    $logs = $cropRegistryLogs->selectByZoneID($zoneID);

    return $logs;
  }
];

?>
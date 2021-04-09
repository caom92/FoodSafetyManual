<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Employee', 'Supervisor', 'Manager', 'Director']
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $cropRegistryLogs = $scope->daoFactory->get('cropRegistry\Logs');
    $zoneID = $segment->get('zone_id');

    $logs = $cropRegistryLogs->selectByZoneID($zoneID);
    $crops = $cropRegistryLogs->selectUniqueCrops();
    $varieties = $cropRegistryLogs->selectUniqueVarieties();

    return [
      'logs' => $logs,
      'crops' => $crops,
      'varieties' => $varieties
    ];
  }
];

?>
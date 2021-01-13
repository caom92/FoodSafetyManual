<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor'],
    'has_privileges' => [
      'privilege' => 'Read',
      'program' => 'GMP',
      'module' => 'Packing',
      'log' => 'Pre-Operational Inspection'
    ]
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $subjects = $scope->daoFactory->get('gmp\packing\preop\SubjectControl');

    return $subjects->selectByZoneID($segment->get('zone_id'));
  }
];

?>
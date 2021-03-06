<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor', 'Employee']
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    return $scope->daoFactory->get('gmp\packing\preop\WorkingAreas')
      ->selectByZoneID($segment->get('zone_id'));
  }
];

?>
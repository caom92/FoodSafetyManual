<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor', 'Manager', 'Director'],
  ],
  'callback' => function($scope, $request) {
    $rows = $scope->daoFactory->get('Zones')->selectZoneNames();

    return $rows;
  }
];

?>
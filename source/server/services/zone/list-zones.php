<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator', 'Director']
  ],
  'callback' => function($scope, $request) {
    return $scope->daoFactory->get('Zones')->selectAll();
  }
];

?>
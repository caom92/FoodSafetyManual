<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'supervisor_id' => [
      'type' => 'int',
      'min' => 1
    ]
  ],
  'callback' => function($scope, $request) {
    return $scope->daoFactory->get('SupervisorsEmployees')
      ->getNumEmployeesBySupervisorID($request['supervisor_id']);
  }
];

?>
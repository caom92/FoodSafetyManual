<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'user_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'zone_id' => [
      'type' => 'int',
      'min' => 1
    ]
  ],
  'callback' => function($scope, $request) {
    // check if the user is already a supervisor so that we check the number of
    // employees she has assigned
    $users = $scope->daoFactory->get('Users');
    $currentRole = $users->getRoleByID($request['user_id']);
    $isCurrentlySupervisor = $currentRole === 'Supervisor';

    if ($isCurrentlySupervisor) {
      // if the current role is supervisor, retrieve the number of employees 
      // that she has assigned
      $numEmployees = 
        $scope->daoFactory->get('SupervisorsEmployees')
        ->getNumEmployeesBySupervisorID($request['user_id']);

      // if she does, prevent the role change
      $hasEmployeesAssigned = $numEmployees > 0;
      if ($hasEmployeesAssigned) {
        throw new \Exception('Supervisor has employees assigned.');
      }
    }

    $users->updateZoneIDByID($request['user_id'], $request['zone_id']);
  }
];

?>
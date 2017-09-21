<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'assignments' => [
      'type' => 'array',
      'values' => [
        'employee_id' => [
          'type' => 'int',
          'min' => 1
        ],
        'supervisor_id' => [
          'type' => 'int',
          'min' => 1
        ]
      ]
    ]
  ],
  'callback' => function($scope, $request) {
    // first, we need to check the input data
    foreach ($request['assignments'] as $assignment) {
      // check if the supervisor has the proper role
      $users = $scope->daoFactory->get('Users');
      $isSupervisorRole = $users->getRoleByID($assignment['supervisor_id']) 
        == 'Supervisor';

      // check if the employee has the proper role
      $isEmployeeRole = $users->getRoleByID($assignment['employee_id']) 
        == 'Employee';

      // if the users do not have the proper role, notify the user
      if (!$isSupervisorRole || !$isEmployeeRole) {
        throw new \Exception(
          'The users do not have the proper roles for one of the '.
          'assignments', 1
        );
      }

      // check if the users share the same zone
      $haveSameZone = 
        $users->getZoneIDByID($assignment['supervisor_id']) ==
        $users->getZoneIDByID($assignment['employee_id']);

      // if the users are not in the same zone, notify the user
      if (!$haveSameZone) {
        throw new \Exception(
          'The users do not share the same zone for one of the '.
          'assignments', 2
        );
      }
    }

    // insert each assignment
    foreach ($request['assignments'] as $assignment) {
      $scope->daoFactory->get('SupervisorsEmployees')
        ->insert($assignment);
    }
  }
];

?>
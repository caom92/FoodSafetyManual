<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'user_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'role_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'supervisor_id' => [
      'type' => 'int',
      'min' => 1,
      'optional' => true
    ]
  ],
  'callback' => function($scope, $request) {
    // check if the user is already a supervisor so that we check the number of
    // employees she has assigned
    $users = $scope->daoFactory->get('Users');
    $supervisorsEmployees = $scope->daoFactory->get('SupervisorsEmployees');
    $currentRole = $users->getRoleByID($request['user_id']);
    $isCurrentlySupervisor = $currentRole === 'Supervisor';
    $isCurrentlyEmployee = $currentRole === 'Employee';

    if ($isCurrentlySupervisor) {
      // if the current role is supervisor, retrieve the number of employees 
      // that she has assigned
      $numEmployees = 
        $supervisorsEmployees->getNumEmployeesBySupervisorID(
          $request['user_id']
        );

      // if she does, prevent the role change
      $hasEmployeesAssigned = $numEmployees > 0;
      if ($hasEmployeesAssigned) {
        throw new \Exception('Supervisor has employees assigned.');
      }
    }

    // check if the user will be assigned an employee role, and if that is the 
    // case, then that means that a supervisor ID must be provided so that the
    // user gets assigned to that supervisor
    $roleName = $scope->daoFactory->get('Roles')
      ->getNameByID($request['role_id']);
    $isSupervisorRequired = $roleName === 'Employee';
    
    // if a supervisor is required ...
    if ($isSupervisorRequired) {
      // first, check if the user already has a supervisor assigned
      $hasSupervisor = $supervisorsEmployees->hasEmployeeID(
        $request['user_id']);

      // if the user does not have a supervisor assigned, we need to assign
      // her the one that was provided
      if (!$hasSupervisor) {
        // check that the supervisor ID was provided
        $isSupervisorIDValid = 
          isset($request['supervisor_id'])
          && array_key_exists('supervisor_id', $request);

        // if it was provided...
        if ($isSupervisorIDValid) {
          // if the supervisor ID is valid, assert that the ID 
          // provided corresponds to a supervisor and that both the 
          // supervisor and the employee share the same zone

          // get the supervisor's zone and role
          $supervisorZone = 
            $users->getZoneIDByID($request['supervisor_id']);

          $supervisorRole =
            $users->getRoleByID($request['supervisor_id']);

          // check if the supervisor has the same zone as the employee
          $userData = $users->getByIdentifier($request['user_id']);
          $haveSameZone = 
            $supervisorZone === $userData['zone_id'];

          // check if the supervisor has a supervisor role
          $hasSupervisorRole = 
            $supervisorRole === 'Supervisor';

          // if the zone is not the same, notify the user
          if (!$haveSameZone) {
            throw new \Exception(
              'The employee is in a different zone than the '.
              'supervisor'
            );
          }

          // if the supervisor does not have the proper role, notify 
          // the user
          if (!$hasSupervisorRole) {
            throw new \Exception(
              'The provided supervisor ID does not correspond to'.
              ' a user with supervisor role'
            );
          }

          // if the supervisor ID is valid and can be assigned, do 
          // the actual assignment
          $supervisorsEmployees->insert([
            'supervisor_id' => $request['supervisor_id'],
            'employee_id' => $request['user_id']
          ]);
        } else {
          // if the supervisor ID was not provided, notify the user
          throw new \Exception(
            'Employees must be assigned to a supervisor; no supervisor'.
            ' ID was provided.'
          );
        }
      }
    }

    // finally, change the user role
    $users->updateRoleByID($request['user_id'], $request['role_id']);
  }
];

?>
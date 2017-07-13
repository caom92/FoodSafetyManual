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
    $users = $scope->daoFactory->get('Users');
    $supervisorsEmployees = $scope->daoFactory->get('SupervisorsEmployees');
    $currentRole = $users->getRoleByID($request['user_id']);
    $futureRole = $users->getRoleByID($request['role_id']);
    $isCurrentlySupervisor = $currentRole === 'Supervisor';
    $isCurrentlyEmployee = $currentRole === 'Employee';
    $willBecomeEmployee = $futureRole === 'Employee';

    // depending on the current role and the rol that the user will change to 
    // we must make a different set of validations

    if ($isCurrentlyEmployee) {
      // if the user is currently an employee, no matter to which role she will
      // change, her relationship with her supervisor must be deleted
      $supervisorsEmployees->deleteByEmployeeID($request['user_id']);
    } else {
      // if the user is currently a supervisor, no matter to which role she will
      // change, we must prevent the change if she has employees assigned
      if ($isCurrentlySupervisor) {
        // check if she has employees assigned
        $numEmployees = 
          $supervisorsEmployees->getNumEmployeesBySupervisorID(
            $request['user_id']
          );
        
        // if she does, throw an exception
        $hasEmployeesAssigned = $numEmployees > 0;
        if ($hasEmployeesAssigned) {
          throw new \Exception('Supervisor has employees assigned.');
        }
      }

      // no matter the current role of the user, if she will change to an
      // employee, then a supervisor ID in the same zone as the user will be
      // required
      if ($willBecomeEmployee) {
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

            $userZone = 
              $users->getZoneIDByID($request['user_id']);

            // check if the supervisor has the same zone as the employee
            $haveSameZone = 
              $supervisorZone === $userZone;

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
          } // if ($isSupervisorIDValid)
        } // if (!$hasSupervisor)
      } // if ($willBecomeEmployee)
    } // if ($isCurrentlyEmployee)

    // finally, change the user role
    $users->updateRoleByID($request['user_id'], $request['role_id']);
  }
];

?>
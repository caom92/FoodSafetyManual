<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'employee_num' => [
      'type' => 'int'
    ],
    'first_name' => [
      'type' => 'string',
      'min_length' => 1
    ],
    'last_name' => [
      'type' => 'string',
      'min_length' => 1
    ],
    'role_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'login_name' => [
      'type' => 'string',
      'min_length' => 3
    ],  
    'login_password' => [
      'type' => 'string',
      'min_length' => 6
    ],
    'zone_id' => [
      'type' => 'int',
      'min' => 1,
      'optional' => true
    ],
    'supervisor_id' => [
      'type' => 'int',
      'min' => 1,
      'optional' => true
    ],
    'privileges' => [
      'type' => 'array',
      'optional' => true,
      'values' => [
        'log_id' => [
          'type' => 'int',
          'min' => 1
        ],
        'privilege_id' => [
          'type' => 'int',
          'min' => 1
        ]
      ]
    ]
  ],
  'callback' => function($scope, $request) {
    // then, hash the password
    $hashedPassword = password_hash(
      $request['login_password'],
      \PASSWORD_BCRYPT
    );

    // get the role name
    $roleName = $scope->daoFactory->get('Roles')
      ->getNameByID($request['role_id']);

    // user data to store in the data base
    $userData = [
      'is_active' => TRUE,
      'role_id' => $request['role_id'],
      'employee_num' => $request['employee_num'],
      'first_name' => $request['first_name'],
      'last_name' => $request['last_name'],
      'login_name' => $request['login_name'],
      'login_password' => $hashedPassword
    ];

    // check the user role
    $isManager = $roleName == 'Manager';
    $isSupervisor = $roleName == 'Supervisor';
    $isEmployee = $roleName == 'Employee';

    // check if the user role requires a zone to be specified
    $isZoneRequired = 
      $isManager ||
      $isSupervisor ||
      $isEmployee;

    // check if the user role requires a supervisor to be specified
    $isSupervisorRequired = $isEmployee;

    // check if the user role requires privileges to be specified
    $arePrivilegesRequired = $isSupervisor || $isEmployee;

    // if a zone is required ...
    if ($isZoneRequired) {
      // check if the zone ID was sent by the user
      $isZoneIDValid = 
        isset($request['zone_id'])
        && array_key_exists('zone_id', $request);
      
      // if it was ...
      if ($isZoneIDValid) {
        // store it in the user data
        $userData['zone_id'] = $request['zone_id'];
      } else {
        // if the zone ID was not provided, notify the user
        throw new \Exception(
          'The zone ID was not provided.',
          1
        );
      }
    } else {
      // if the role does not require a zone ID, set a default one
      $userData['zone_id'] = 1;
    }

    // insert the profile data to the data base 
    $users = $scope->daoFactory->get('Users');
    $userID = $users->insert($userData);

    // if a supervisor is required ...
    if ($isSupervisorRequired) {
      // check that the supervisor ID was provided
      $isSupervisorIDValid = 
        isset($request['supervisor_id'])
        && array_key_exists('supervisor_id', $request);

      // if it was provided...
      if ($isSupervisorIDValid) {
        // if the supervisor ID is valid, assert that the ID provided 
        // corresponds to a supervisor and that both the 
        // supervisor and the employee share the same zone

        // get the supervisor's zone and role
        $supervisorZone = 
          $users->getZoneIDByID($request['supervisor_id']);

        $supervisorRole =
          $users->getRoleByID($request['supervisor_id']);

        // check if the supervisor has the same zone as the employee
        $haveSameZone = 
          $supervisorZone == $userData['zone_id'];

        // check if the supervisor has a supervisor role
        $hasSupervisorRole = 
          $supervisorRole == 'Supervisor';

        // if the zone is not the same, notify the user
        if (!$haveSameZone) {
          $users->deleteByID($userID);
          throw new \Exception(
            'The employee is in a different zone than the '.
            'supervisor',
            2
          );
        }

        // if the supervisor does not have the proper role, notify the 
        // user
        if (!$hasSupervisorRole) {
          $users->deleteByID($userID);
          throw new \Exception(
            'The provided supervisor ID does not correspond to a '.
            'user with supervisor role',
            3
          );
        }

        // if the supervisor ID is valid and can be assigned, do the 
        // actual assignment
        $scope->daoFactory->get('SupervisorsEmployees')->insert([
          'supervisor_id' => $request['supervisor_id'],
          'employee_id' => $userID
        ]);
      } else {
        // if the supervisor ID was not provided, notify the user
        $users->deleteByID($userID);
        throw new \Exception(
          'Employees must be assigned to a supervisor; no supervisor ID '.
          'was provided.',
          4
        );
      }
    }

    if ($arePrivilegesRequired) {
      // check that the data in the privileges array exists and is 
      // of the proper type
      $hasPrivileges = isset($request['privileges']) 
        && array_key_exists('privileges', $request);
      if (!$hasPrivileges) {
        // if it was not provided, throw an exception
        $users->deleteByID($userID);
        throw new \Exception('Privileges array was not provided.', 5);
      }

      // supervisor and employees get their permissions assigned by the 
      // administrator for a single zone only

      // get the ID of the read privilege
      $privilegeID = $scope->daoFactory->get('Privileges')
        ->getIDByName('Read');

      // create a privileges array with the proper format that medoo is 
      // expecting
      $privileges = [];
      foreach ($request['privileges'] as $privilege) {
        array_push($privileges, [
          'user_id' => $userID,
          'log_id' => $privilege['log_id'],
          'privilege_id' => ($isSupervisor) ?
            $privilegeID :
            $privilege['privilege_id']
        ]);
      }

      // store the user privileges in the data base 
      $scope->daoFactory->get('UsersLogsPrivileges')->insert($privileges);
    }
  }
];

?>
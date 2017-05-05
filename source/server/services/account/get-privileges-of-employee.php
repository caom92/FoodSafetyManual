<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'employee_num' => [
      'type' => 'int'
    ]
  ],
  'callback' => function($scope, $request) {
    $users = $scope->daoFactory->get('Users');
    $usersLogsPrivileges = $scope->daoFactory->get('UsersLogsPrivileges');
    $role = $users->getRoleByEmployeeNum($request['employee_num']);

    // check if the role of this user requires privileges to be read from the db
    $requiresPrivileges = $role === 'Supervisor' || $role === 'Employee';
    if ($requiresPrivileges) {
      // if the user requires its privileges to be read from the db
      // connect to the db to get them
      $rows = $usersLogsPrivileges->selectByEmployeeNum(
        $request['employee_num']);

      // before we start, we must check if the user has privileges assigned to
      // ALL logs in the database
      $allLogs = $scope->daoFactory->get('Logs')->selectAll();
      $isUserMissingLogs = count($rows) < count($allLogs);

      // if the user is missing logs in its privileges array...
      if ($isUserMissingLogs) {
        // get the ID of the user and for the None privilege
        $userID = $users->getIDByEmployeeNum(
          $request['employee_num']);
        $privilegeID = $scope->daoFactory->get('Privileges')
          ->getIDByName('None');

        // create temporal storage for all the new privileges that will be 
        // stored in the data base
        $newPrivileges = [];

        // then, visit all the logs from the data base
        foreach ($allLogs as $log) {
          // initialize a flag that will tell if the user is missing a 
          // privilege for this log
          $isLogMissing = true;

          // then, visit the logs for which the user has a privilege 
          // assigned
          foreach ($rows as $privilegedLog) {
            // if the log has a privilege assigned, update the flag and 
            // break the loop
            if ($privilegedLog['log_id'] == $log['log_id']) {
              $isLogMissing = false;
              break;
            }
          }

          // if the user does not have a privilege assigned for the log,
          // push it to the array of new privileges to be assigned to the 
          // user
          if ($isLogMissing) {
            array_push($newPrivileges, [
              'user_id' => $userID,
              'log_id' => $log['log_id'],
              'privilege_id' => $privilegeID
            ]);
          }
        }

        // insert the new privileges to the data base
        $usersLogsPrivileges->insert($newPrivileges);

        // get the updated list of privileges
        $rows = $usersLogsPrivileges->selectByEmployeeNum(
          $request['employee_num']);
      }

      // now prepare the temporal storage for the array that will contain
      // the privileges of the user
      $privileges = [];
      $program = [
        'id' => 0,
        'name' => '',
        'modules' => []
      ];
      $module = [
        'id' => 0,
        'name' => '',
        'logs' => []
      ];

      // for each row read from the db
      foreach ($rows as $row) {
        // check if the program has changed
        $hasProgramChanged = $row['program_id'] != $program['id'];
        if ($hasProgramChanged) {
          // if it has, check that the current program is not empty
          if ($program['id'] != 0) {
            // if its not, save the current modules to it
            array_push($program['modules'], $module);

            // and save the current program to the final array
            array_push($privileges, $program);
          }

          // then read the log privilege of the new program
          $log = [
            'id' => $row['log_id'],
            'name' => $row['log_name'],
            'privilege_id' => $row['privilege_id']
          ];

          // and fill the temporal storage of the new module and program
          $module = [
            'id' => $row['module_id'],
            'name' => $row['module_name'],
            'logs' => [ $log ]
          ];
          $program = [
            'id' => $row['program_id'],
            'name' => $row['program_name'],
            'modules' => []
          ];
        } else {
          // if the module has changed
          $hasModuleChanged = $row['module_id'] != $module['id'];
          if ($hasModuleChanged) {
            // store the current module to the current program
            array_push($program['modules'], $module);

            // and start saving the info of the log and the new module
            $log = [
              'id' => $row['log_id'],
              'name' => $row['log_name'],
              'privilege_id' => $row['privilege_id']
            ];
            $module = [
              'id' => $row['module_id'],
              'name' => $row['module_name'],
              'logs' => [ $log ]
            ];
          } else {
            // if the program, nor the module have changed, simply store
            // the log info in the current module storage
            array_push($module['logs'], [
              'id' => $row['log_id'],
              'name' => $row['log_name'],
              'privilege_id' => $row['privilege_id']
            ]);
          }
        }
      }

      // don't forget to store the last module and program
      if ($module['id'] != 0) {
        array_push($program['modules'], $module);
      }

      if ($program['id'] != 0) {
        array_push($privileges, $program);
      }

      // and return the resulting array
      return $privileges;
    } else {
      // if the user role does not requires her to have privileges, don't
      // even bother with computer the array
      return [];
    }
  }
];

?>
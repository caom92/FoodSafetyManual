<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor', 'Employee']
  ],
  'callback' => function($scope, $request) {
    // get the session segment
    $segment = $scope->session->getSegment('fsm');
    $userID = $segment->get('user_id');

    // prepare the temporal storage for the final logs array
    $userLogs = [
      'waiting' => [
        'id' => 0,
        'name' => 'Waiting',
        'logs' => []
      ],
      'rejected' => [
        'id' => 0,
        'name' => 'Rejected',
        'logs' => []
      ]
    ];

    // check if the user is an administrator
    if ($segment->get('role_name') === 'Supervisor') {
      // then, get the list of employees that the supervisor has assigned
      $employees = 
        $scope->daoFactory->get('SupervisorsEmployees')
          ->selectEmployeesBySupervisorID($userID);

      // for each employee assigned to the supervisor...
      foreach ($employees as $employee) {
        // get the unapproved logs that where captured by the employee
        $employeeLogs =    
          $scope->daoFactory->get('CapturedLogs')
            ->selectUnapprovedLogsByUserID($employee['id']);
        
        // push every unapproved log to the final storage
        foreach ($employeeLogs as $log) {
          // check if the status of the log is waiting
          if ($log['status_name'] == 'Waiting') {
            // if the status ID is not stored yet, store it
            if ($userLogs['waiting']['id'] == 0) {
              $userLogs['waiting']['id'] = $log['status_id'];
            }

            // push the log to the waiting array
            array_push($userLogs['waiting']['logs'], [
              'captured_log_id' => $log['captured_log_id'],
              'program_name' => $log['program_name'],
              'module_name' => $log['module_name'],
              'log_name' => $log['log_name'],
              'employee_id' => $log['employee_id'],
              'employee_num' => $log['employee_num'],
              'first_name' => $log['first_name'],
              'last_name' => $log['last_name'],
              'capture_date' => $log['capture_date'],
              'service_name' => $log['service_name']
            ]);
          } else {
            // if the status is Rejected, store the ID if it is not 
            // stored yet
            if ($userLogs['rejected']['id'] == 0) {
              $userLogs['rejected']['id'] = $log['status_id'];
            }

            // push the log to the rejected array
            array_push($userLogs['rejected']['logs'], [
              'captured_log_id' => $log['captured_log_id'],
              'program_name' => $log['program_name'],
              'module_name' => $log['module_name'],
              'log_name' => $log['log_name'],
              'employee_id' => $log['employee_id'],
              'employee_num' => $log['employee_num'],
              'first_name' => $log['first_name'],
              'last_name' => $log['last_name'],
              'capture_date' => $log['capture_date'],
              'service_name' => $log['service_name']
            ]);
          }
        }
      }
    } else {
      // if the user is not a supervisor, it means it is an employee

      // retrieve from the database the unapproved logs
      $unapprovedLogs = $scope->daoFactory->get('CapturedLogs')
        ->selectUnapprovedLogsByUserID($userID);

      // store each one of them in the final storage
      foreach ($unapprovedLogs as $log) {
        // check if the status of the log is waiting
        if ($log['status_name'] == 'Waiting') {
          // if the status ID is not stored yet, store it
          if ($userLogs['waiting']['id'] == 0) {
            $userLogs['waiting']['id'] = $log['status_id'];
          }

          // push the log to the waiting array
          array_push($userLogs['waiting']['logs'], [
            'captured_log_id' => $log['captured_log_id'],
            'program_name' => $log['program_name'],
            'module_name' => $log['module_name'],
            'log_name' => $log['log_name'],
            'capture_date' => $log['capture_date'],
            'service_name' => $log['service_name']
          ]);
        } else {
          // if the status is Rejected, store the ID if it is not stored 
          // yet
          if ($userLogs['rejected']['id'] == 0) {
            $userLogs['rejected']['id'] = $log['status_id'];
          }

          // push the log to the rejected array
          array_push($userLogs['rejected']['logs'], [
            'captured_log_id' => $log['captured_log_id'],
            'program_name' => $log['program_name'],
            'module_name' => $log['module_name'],
            'log_name' => $log['log_name'],
            'capture_date' => $log['capture_date'],
            'service_name' => $log['service_name']
          ]);
        }
      }
    }

    // return the resulting array of logs to the user
    return $userLogs;
  }
];

?>
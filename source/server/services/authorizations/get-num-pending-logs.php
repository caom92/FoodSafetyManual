<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor']
  ],
  'callback' => function($scope, $request) {
    // get session segment
    $segment = $scope->session->getSegment('fsm');
    $userID = $segment->get('user_id');

    // temporal storage for the number of pending logs
    $numPendingLogs = 0;

    $capturedLogs = $scope->daoFactory->get('CapturedLogs');

    // check if the user is a supervisor
    if ($segment->get('role_name') === 'Supervisor') {
      // then, get the list of employees that the supervisor has assigned
      $employees = $scope->daoFactory->get('SupervisorsEmployees')
        ->selectEmployeesBySupervisorID($userID);

      // for each employee assigned to the supervisor...
      foreach ($employees as $employee) {
        $numPendingLogs += (int)$capturedLogs
          ->countUnapprovedLogsByUserID($employee['id']);
      }
    } else {
      // if the user is not a supervisor, it means she's an employee
      $numPendingLogs += $capturedLogs
        ->countUnapprovedLogsByUserID($userID);
    }

    // return the resulting number
    return $numPendingLogs;
  }
];

?>
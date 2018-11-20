<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Director'],
    'captured_log_id' => [
      'type' => 'int',
      'min' => 1
    ]
  ],
  'callback' => function($scope, $request) {
    // get session segment
    $segment = $scope->session->getSegment('fsm');

    // check if the user that captured the log is assigned to the supervisor
    $capturedLogs = $scope->daoFactory->get('CapturedLogs'); 
    $employeeID = $capturedLogs
      ->selectUserIDByID($request['captured_log_id']);
    $isUserEmployee = 
      $scope->daoFactory->get('Users')
        ->isUserEmployee($employeeID);
    
    // if the user is not assigned to the supervisor, prevent the update and
    // notify the user
    if (!$isUserEmployee) {
      throw new \Exception(
        'This log can not be changed to waiting status; the user '.
        'who captured the log is no longer an employee.',
        1
      );
    }

    $isEmployeeActive = 
      $scope->daoFactory->get('Users')
        ->isUserActive($employeeID);

    if (!$isEmployeeActive) {
      throw new \Exception(
        'This log can not be changed to waiting status; the user '.
        'who captured the log is no longer active.',
        2
      );
    }

    // if the log can be reset to waiting, update the log 
    // status
    $capturedLogs->updateStatusToWaitingByID(
      $request['captured_log_id']
    );
  }
];

?>
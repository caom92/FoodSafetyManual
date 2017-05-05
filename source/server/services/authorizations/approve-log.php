<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor'],
    'captured_log_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'date' => [
      'type' => 'datetime',
      'format' => 'Y-m-d'
    ]
  ],
  'callback' => function($scope, $request) {
    // get session segment
    $segment = $scope->session->getSegment('fsm');

    // check if the user that captured the log is assigned to the supervisor
    $capturedLogs = $scope->daoFactory->get('CapturedLogs'); 
    $employeeID = $capturedLogs
      ->selectUserIDByID($request['captured_log_id']);
    $hasEmployeeAssigned = 
      $scope->daoFactory->get('SupervisorsEmployees')
        ->hasSupervisorAndEmployeeID($segment->get('user_id'), $employeeID);
    
    // if the user is not assigned to the supervisor, prevent the update and
    // notify the user
    if (!$hasEmployeeAssigned) {
      throw new \Exception(
        'This supervisor is not allowed to authorize this log; the '.
        'employee that captured the log is not assigned to her.'
      );
    }

    // if the supervisor is authorized to approve this log, update the log 
    // status
    $capturedLogs->updateStatusToApprovedByID(
      $request['captured_log_id'],
      $request['date']
    );
  }
];

?>
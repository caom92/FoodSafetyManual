<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor'],
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
    $employeeID = $capturedLogs->selectUserIDByID($request['captured_log_id']);
    $hasEmployeeAssigned = 
      $scope->daoFactory->get('SupervisorsEmployees')
        ->hasSupervisorAndEmployeeID($segment->get('user_id'), $employeeID);
    
    // if the user is not assigned to the supervisor, prevent the update and
    // notify the user
    if (!$hasEmployeeAssigned) {
      throw new \Exception(
        'This supervisor is not allowed to reject this log; the '.
        'employee that captured the log is not assigned to her.',
        1
      );
    }

    // check if the log is already approved
    $isApproved = $capturedLogs
      ->getStatusByID($request['captured_log_id']) == 'Approved';
    if ($isApproved) {
      // if it is, prevent the status change and notify the user
      throw new \Exception(
        'The log is already approved and it cannot be changed.',
        2
      );
    }

    // if the supervisor is authorized to approve this log, update the log 
    // status
    $capturedLogs->updateStatusToRejectedByID($request['captured_log_id']);
  }
];

?>
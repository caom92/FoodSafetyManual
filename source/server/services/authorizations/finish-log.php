<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Employee'],
    'captured_log_id' => [
      'type' => 'int',
      'min' => 1
    ]
  ],
  'callback' => function($scope, $request) {
    // get session segment
    $segment = $scope->session->getSegment('fsm');
    $capturedLogs = $scope->daoFactory->get('CapturedLogs');
    $users = $scope->daoFactory->get('Users');

    $capturerID = $capturedLogs->selectUserIDByID($request['captured_log_id']);
    $capturerZone = $users->getZoneIDByID($capturerID);

    $approverZone = $segment->get('zone_id');

    // check if the user belongs to the zone of the log
    $isEmployeeOnSameZone = $approverZone == $capturerZone;
    
    // if the user is not assigned to the supervisor, prevent the update and
    // notify the user
    if (!$isEmployeeOnSameZone) {
      throw new \Exception(
        'This employee is not allowed to authorize this log; the '.
        'employee does not belong to this zone.',
        1
      );
    }

    // if the supervisor is authorized to approve this log, update the log 
    // status
    $capturedLogs->updateStatusToWaitingByID(
      $request['captured_log_id']
    );
  }
];

?>
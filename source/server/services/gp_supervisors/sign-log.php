<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['GP Supervisor'],
    'captured_log_id' => [
      'type' => 'int',
      'min' => 1
    ]
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    
    $capturedLogs = $scope->daoFactory->get('CapturedLogs');
    $assignedZones = $scope->daoFactory->get('gpSupervisors\AssignedZones');

    $userID = $segment->get('user_id');

    // check if the log has already been approved by a Supervisor
    $isApproved = $capturedLogs->getStatusByID($request['captured_log_id']) == 'Approved';

    if ($isApproved) {
      // check if the log zone matches one of the assigned zones of the GP Supervisor
      $zones = $assignedZones->selectZoneIDByUserID($userID); // zones of supervisor
      $zoneID = $capturedLogs->selectZoneIDByCapturedLogID($request['captured_log_id']); // zone of log
      $isZoneValid = in_array(['id' => $zoneID], $zones);
      if ($isZoneValid) {
        $capturedLogs->signByCapturedLogID($request['captured_log_id'], $userID);
        return $request['captured_log_id'];
      } else {
        throw new \Exception(
          'GP Supervisor is not allowed to sign logs in this zone.',
          2
        );  
      }
    } else {
      throw new \Exception(
        'The log has not been approved by a supervisor and it cannot be signed.',
        1
      );
    }

    // if all checks were passed, sign the log
    /*$capturedLogs->signLogByID(
      $request['captured_log_id']
    );*/
  }
];

?>
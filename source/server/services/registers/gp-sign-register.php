<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['GP Supervisor'],
    'captured_register_id' => [
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

    // check if the user that captured the register is assigned to the GP Supervisor's zone
    $capturedRegisters = $scope->daoFactory->get('CapturedRegisters');
    $assignedZones = $scope->daoFactory->get('gpSupervisors\AssignedZones');
    $gpSupervisorID = $segment->get('user_id');

    $isApproved = $capturedRegisters->isApprovedBySupervisor($request['captured_register_id']);

    // check if the register has already been approved by a Supervisor
    if ($isApproved) {
      // check if the register zone matches one of the assigned zones of the GP Supervisor
      $zones = $assignedZones->selectZoneIDByUserID($gpSupervisorID); // zones of GP Supervisor
      $zoneID = $capturedRegisters->selectZoneIDByID($request['captured_register_id']); // zone of log
      $isZoneValid = in_array(['id' => $zoneID], $zones);
      if ($isZoneValid) {
        $capturedRegisters->approveRegisterByGPSupervisor(
          $request['captured_register_id'],
          $gpSupervisorID,
          $request['date']
        );

        $capturedRegisters->approveRegisterByGPSupervisor($request['captured_register_id'], $gpSupervisorID, $request['date']);

        $users = $scope->daoFactory->get('Users');
        $path = $users->getNameByID($gpSupervisorID)['signature_path'];

        return [
          'gp_supervisor_id' => $gpSupervisorID,
          'gp_signature_path' => $path,
        ];
        //return $request['captured_register_id'];
      } else {
        throw new \Exception(
          'GP Supervisor is not allowed to sign registers in this zone.',
          2
        );  
      }
    } else {
      throw new \Exception(
        'The register has not been approved by a supervisor and it cannot be signed.',
        1
      );
    }
  }
];

?>
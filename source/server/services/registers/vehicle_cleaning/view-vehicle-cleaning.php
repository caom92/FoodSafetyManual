<?php

require_once realpath(dirname(__FILE__).'/../../service_creators.php');

$service = fsm\createViewRegisterService(
  'vehicle-cleaning',
  [],
  function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $vehicleCleaningLogs = $scope->daoFactory->get('vehicleCleaning\Logs');
    $zoneID = $segment->get('zone_id');
    $role = $segment->get('role_name');

    if ($role === 'GP Supervisor') {
      $registers = $vehicleCleaningLogs->selectAll($request['start_date'], $request['end_date']);
    } else {
      $registers = $vehicleCleaningLogs->selectByZoneID($zoneID, $request['start_date'], $request['end_date']);
    }

    // Only supervisors may sign registers
    if ($role === 'Supervisor') {
      // Then check if for a given register a Supervisor is assigned to the user who submitted the register
      $supervisorID = $segment->get('user_id');
      foreach($registers as &$register) {
        $submitterID = $register['submitter_id'];
        $signable = $scope->daoFactory->get('SupervisorsEmployees')->hasSupervisorAndEmployeeID($supervisorID, $submitterID);
        $register['signable'] = $signable ? 1 : 0;
        $register['gp_signable'] = 0;
      }
    } else if ($role === 'GP Supervisor') {
      $gpSupervisorID = $segment->get('user_id');
      $assignedZones = $scope->daoFactory->get('gpSupervisors\AssignedZones');
      $capturedRegisters = $scope->daoFactory->get('CapturedRegisters');
      $zones = $assignedZones->selectZoneIDByUserID($gpSupervisorID); // zones of GP Supervisor
      foreach($registers as &$register) {
        $zoneID = $register['zone_id'];
        $isZoneValid = in_array(['id' => $zoneID], $zones);
        $isApproved = $capturedRegisters->isApprovedBySupervisor($register['captured_register_id']);
        $register['signable'] = 0;
        $register['gp_signable'] = $isZoneValid && $isApproved ? 1 : 0;
      }
    } else {
      foreach($registers as &$register) {
        $register['signable'] = 0;
        $register['gp_signable'] = 0;
      }
    }

    return [
      'registers' => $registers
    ];
  },
  ['registers']
);

?>
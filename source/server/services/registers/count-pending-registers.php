<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor','GP Supervisor'],
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $capturedRegisters = $scope->daoFactory->get('CapturedRegisters');
    $userID = $segment->get('user_id');
    $role = $segment->get('role_name');

    $pendingRegistersCount = 0;

    if ($role === 'Supervisor') {
      $supervisorEmployees = $scope->daoFactory->get('SupervisorsEmployees');
      $employees = $supervisorEmployees->selectEmployeesBySupervisorID($userID);
      foreach ($employees as $employee) {
        $pendingRegistersCount += (int)$capturedRegisters
          ->countUnsignedRegistersByUserID($employee['id']);
      }
    } else if ($role === 'GP Supervisor') {
      $assignedZones = $scope->daoFactory->get('gpSupervisors\AssignedZones');
      $zones = $assignedZones->selectZoneIDByUserID($userID);
      foreach ($zones as $zone) {
        $pendingRegistersCount += (int)$capturedRegisters
          ->countGpUnsignedRegistersByZoneID($zone['id']);
      }
    }

    return $pendingRegistersCount;
  }
];

?>
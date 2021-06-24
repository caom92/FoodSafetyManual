<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Employee','Supervisor','GP Supervisor','Manager','Director']
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $userID = $segment->get('user_id');
    $role = $segment->get('role_name');
    $registersTable = $scope->daoFactory->get('Registers');

    $registers = $registersTable->selectAll();

    $registerList = [];

    foreach($registers as $register) {
      $capturedRegisters = $scope->daoFactory->get('CapturedRegisters');
      $pendingRegistersCount = 0;

      if ($role === 'Supervisor') {
        $supervisorEmployees = $scope->daoFactory->get('SupervisorsEmployees');
        $employees = $supervisorEmployees->selectEmployeesBySupervisorID($userID);
        foreach ($employees as $employee) {
          $pendingRegistersCount += (int)$capturedRegisters
            ->countUnsignedRegistersByUserIDAndRegisterID($employee['id'], $register['id']);
        }
      } else if ($role === 'GP Supervisor') {
        $assignedZones = $scope->daoFactory->get('gpSupervisors\AssignedZones');
        $zones = $assignedZones->selectZoneIDByUserID($userID);
        foreach ($zones as $zone) {
          $pendingRegistersCount += (int)$capturedRegisters
            ->countGpUnsignedRegistersByZoneIDAndRegisterID($zone['id'], $register['id']);
        }
      }

      array_push($registerList, [
        'name' => [
          'en' => $register['name_en'],
          'es' => $register['name_es']
        ],
        'code' => $register['code'],
        'pending' => $pendingRegistersCount
      ]);
    }

    return $registerList;
  }
];

?>
<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor'],
    'captured_register_id' => [
      'type' => 'int',
      'min' => 1
    ]
  ],
  'callback' => function($scope, $request) {
    // get session segment
    $segment = $scope->session->getSegment('fsm');

    // check if the user that captured the register is assigned to the supervisor
    $capturedRegisters = $scope->daoFactory->get('CapturedRegisters'); 
    $submitterID = $capturedRegisters->selectSubmitterIDByID($request['captured_register_id']);
    $supervisorID = $segment->get('user_id');
    $hasEmployeeAssigned = 
      $scope->daoFactory->get('SupervisorsEmployees')
        ->hasSupervisorAndEmployeeID($supervisorID, $submitterID);
    
    // if the user is not assigned to the supervisor, prevent the update and
    // notify the user
    if (!$hasEmployeeAssigned) {
      throw new \Exception(
        'This supervisor is not allowed to sign this register; the '.
        'employee that captured the log is not assigned to this supervisor.',
        1
      );
    }

    $isAlreadyApproved = $capturedRegisters->isApprovedBySupervisor($request['captured_register_id']);

    if ($isAlreadyApproved) {
      throw new \Exception(
        'This supervisor is not allowed to delete this register; the '.
        'register is already signed',
        2
      );
    }

    // if the supervisor is authorized to delete this register, update its
    // status
    $capturedRegisters->deleteRegisterByID(
      $request['captured_register_id']
    );

    return [
      'captured_register_id' => $request['captured_register_id']
    ];
  }
];

?>
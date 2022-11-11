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
    $isAlreadyApproved = $capturedRegisters->isApprovedBySupervisor($request['captured_register_id']);

    if (!$isAlreadyApproved) {
      throw new \Exception(
        'This supervisor is not allowed to unsign this register; the '.
        'register has not been signed.',
        2
      );
    }

    $supervisorID = $segment->get('user_id');
    $approverID = 
      $scope->daoFactory->get('CapturedRegisters')
        ->approverIDByCapturedRegisterID($request['captured_register_id']);

    $sameSupervisor = $supervisorID == $approverID;
    
    // if the supervisor can't unsign the register, prevent the update and
    // notify the user
    if (!$sameSupervisor) {
      throw new \Exception(
        'This supervisor is not allowed to unsign this register; only the '.
        'supervisor that signed the register is allowed to unsign it.',
        1
      );
    }

    // if the supervisor is authorized to unsign this register, update its
    // status
    $capturedRegisters->disapproveRegisterBySupervisor(
      $request['captured_register_id']
    );

    return [
      'supervisor_id' => $supervisorID
    ];
  }
];

?>
<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor', 'Manager', 'Director'],
    'id' => [
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

    // check if the user that captured the log is the same that is trying to approve
    $userID = $segment->get('user_id');
    $workOrderLogs = $scope->daoFactory->get('workOrder\Logs');
    $capturerID = $workOrderLogs->selectCreatorIDByID($request['id']);

    if ($userID == $capturerID) {
      if ($workOrderLogs->isFormApproved($request['id']) === false) {
        $workOrderLogs->approveByID($request['id'], $request['date'], $userID);
      } else if ($workOrderLogs->isFormApproved($request['id']) === true) {
        throw new \Exception(
          'This Work Order form is already approved.',
          2
        );
      } else {
        throw new \Exception(
          'The requested Work Order form does not exist.',
          3
        );
      }
    } else {
      throw new \Exception(
        'This user is not allowed to approve this Work Order form; only the creator can change the form\'s status.',
        1
      );
    }

    return $capturerID;
  }
];

?>
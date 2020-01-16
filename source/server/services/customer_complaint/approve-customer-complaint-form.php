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
    $customerComplaintLogs = $scope->daoFactory->get('customerComplaint\Logs');
    $capturerID = $customerComplaintLogs->selectCreatorIDByID($request['id']);

    if ($userID == $capturerID) {
      if ($customerComplaintLogs->isFormApproved($request['id']) === false) {
        $customerComplaintLogs->approveByID($request['id'], $request['date']);
      } else if ($customerComplaintLogs->isFormApproved($request['id']) === true) {
        throw new \Exception(
          'This Customer Complaint form is already approved.',
          2
        );
      } else {
        throw new \Exception(
          'The requested Customer Complaint form does not exist.',
          3
        );
      }
    } else {
      throw new \Exception(
        'This user is not allowed to approve this Customer Complaint form; only the creator can change the form\'s status.',
        1
      );
    }

    return $capturerID;
  }
];

?>
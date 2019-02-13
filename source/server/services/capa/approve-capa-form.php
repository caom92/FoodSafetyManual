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
    $capaForms = $scope->daoFactory->get('capa\Logs');
    $capturerID = $capaForms->selectCreatorIDByID($request['id']);

    if ($userID == $capturerID) {
      if ($capaForms->isFormApproved($request['id']) === false) {
        $capaForms->approveByID($request['id'], $request['date']);
      } else if ($capaForms->isFormApproved($request['id']) === true) {
        throw new \Exception(
          'This CAPA form is already approved.',
          2
        );
      } else {
        throw new \Exception(
          'The requested CAPA form does not exist.',
          3
        );
      }
    } else {
      throw new \Exception(
        'This user is not allowed to approve this CAPA form; only the creator can change the form\'s status.',
        1
      );
    }

    return $capturerID;
  }
];

?>
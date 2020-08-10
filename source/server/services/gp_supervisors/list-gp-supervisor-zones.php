<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['GP Supervisor']
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $assignedZones = $scope->daoFactory->get('gpSupervisors\AssignedZones');

    $userID = $segment->get('user_id');

    return $assignedZones->selectZoneNamesByUserID($userID);
  }
];

?>
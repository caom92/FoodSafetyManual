<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor', 'Manager', 'Director']
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $workOrderLogs = $scope->daoFactory->get('workOrder\Logs');

    $zoneID = $segment->get('zone_id');

    $forms = $workOrderLogs->selectCapturingByZoneID($zoneID);

    foreach ($forms as &$form) {
      $form['creator_name'] = $form['creator_first_name'].' '.$form['creator_last_name'];
      unset($form['creator_first_name']);
      unset($form['creator_last_name']);
    }

    return $forms;
  }
]

?>
<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor', 'Manager', 'Director'],
    'start_date' => [
      'type' => 'datetime',
      'format' => 'Y-m-d'
    ],
    'end_date' => [
      'type' => 'datetime',
      'format' => 'Y-m-d'
    ]
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $workOrderLogs = $scope->daoFactory->get('workOrder\Logs');
    $zoneID = $segment->get('zone_id');

    $forms = $workOrderLogs->selectByDateIntervalAndZoneID($request['start_date'], $request['end_date'], $zoneID);

    foreach ($forms as &$form) {
      $form['creator_name'] = $form['creator_first_name'].' '.$form['creator_last_name'];
      unset($form['creator_first_name']);
      unset($form['creator_last_name']);
      unset($form['accepter_id']);
      unset($form['accepter_first_name']);
      unset($form['accepter_last_name']);
    }

    return $forms;
  }
];

?>
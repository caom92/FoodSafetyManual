<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor', 'Manager', 'Director'],
    'id' => [
      'type' => 'int',
      'min' => 1
    ]
  ],
  'callback' => function($scope, $request) {
    $workOrderLogs = $scope->daoFactory->get('workOrder\Logs');

    $form = $workOrderLogs->selectByLogID($request['id'])[0];
    $form['creator_name'] = $form['creator_first_name'].' '.$form['creator_last_name'];
    unset($form['creator_first_name']);
    unset($form['creator_last_name']);
    unset($form['accepter_id']);
    unset($form['accepter_first_name']);
    unset($form['accepter_last_name']);

    return $form;
  }
];

?>
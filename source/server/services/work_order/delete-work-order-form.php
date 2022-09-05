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

    $workOrderLogs->deleteByID($request['id']);
  }
];

?>
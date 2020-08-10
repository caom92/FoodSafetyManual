<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['GP Supervisor']
  ],
  'callback' => function($scope, $request) {
    $logs = $scope->daoFactory->get('Logs');

    return $logs->selectLogList();
  }
];

?>
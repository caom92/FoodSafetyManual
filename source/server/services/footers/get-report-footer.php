<?php

$service = [
  'requirements_desc' => [
    'logged_in' => 'any',
    'zone_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'log_id' => [
      'type' => 'int',
      'min' => 1
    ]
  ],
  'callback' => function($scope, $request) {
    return $scope->daoFactory->get('ReportFooters')->selectByZoneIDAndLogID(
      $request['zone_id'], $request['log_id']
    );
  }
];

?>
<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'zone_id' => [
      'type' => 'int',
      'min' => 1
    ]
  ],
  'callback' => function($scope, $request) {
    return $scope->daoFactory->get('ReportFooters')->selectByZoneID(
      $request['zone_id']
    );
  }
];

?>
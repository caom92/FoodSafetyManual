<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'employee_num' => [
      'type' => 'int'
    ]
  ],
  'callback' => function($scope, $request) {
    return $scope->daoFactory->get('Users')
      ->hasByEmployeeNum($request['employee_num']);
  }
];

?>
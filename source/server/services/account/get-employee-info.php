<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'employee_num' => [
      'type' => 'int'
    ]
  ],
  'callback' => function($scope, $request) {
    $userInfo = $scope->daoFactory->get('Users')
      ->getByIdentifier($request['employee_num']);
    $supervisorID = $scope->daoFactory->get('SupervisorsEmployees')
      ->getSupervisorIDByUserID($userInfo['user_id']);

    return [
      'id' => $userInfo['user_id'],
      'role_id' => $userInfo['role_id'],
      'role_name' => $userInfo['role_name'],
      'zone_id' => $userInfo['zone_id'],
      'zone_name' => $userInfo['zone_name'],
      'employee_num' => $userInfo['employee_num'],
      'first_name' => $userInfo['first_name'],
      'last_name' => $userInfo['last_name'],
      'login_name' => $userInfo['login_name'],
      'supervisor_id' => $supervisorID
    ];
  }
];

?>
<?php

$service = [
  'requirements_desc' => [
    'logged_in' => [ 'Administrator' ],
    'user_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'employee_num' => [
      'type' => 'int'
    ],
    'first_name' => [
      'type' => 'string',
      'max_length' => 255
    ],
    'last_name' => [
      'type' => 'string',
      'max_length' => 255
    ]
  ],
  'callback' => function($scope, $request) {
    $users = $scope->daoFactory->get('Users');
    $isEmployeeNumDuplicated = 
      $users->hasByEmployeeNumAndDifferentId(
        $request['employee_num'], $request['user_id']
      );
    
    if ($isEmployeeNumDuplicated) {
      throw new \Exception(
        'The employee number is already registered to another user',
        1
      );
    }

    $users->updateNameAndEmployeeNumByID(
      $request['user_id'],
      $request['employee_num'],
      $request['first_name'],
      $request['last_name']
    );
  }
];

?>
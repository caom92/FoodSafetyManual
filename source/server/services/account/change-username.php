<?php

$service = [
  'requirements_desc' => [
    'logged_in' => 'any',
    'password' => [
      'type' => 'string',
      'min_length' => 6
    ],
    'new_username' => [
      'type' => 'string',
      'min_length' => 5
    ]
  ],
  'callback' => function($scope, $request) {
    // get the session segment
    $segment = $scope->session->getSegment('fsm');

    $users = $scope->daoFactory->get('Users');

    // then we check if the name is duplicated and if the password is valid
    $isNameDuplicated = $users->hasByLogInName($request['new_username']);
    $isPasswordValid = password_verify(
      $request['password'],
      $segment->get('login_password')
    );
    
    if ($isNameDuplicated) {
      throw new \Exception(
        'Failed to update user name; new name is already taken.'
      );
    }

    if (!$isPasswordValid) {
      throw new \Exception(
        'Failed to update user name; the password is incorrect.'
      );
    }
    
    // if the password is not duplicated and the password is valid, then
    // update the user name
    $users->updateLogInNameByUserID(
      $segment->get('user_id'),
      $request['new_username']
    );
  }
];

?>
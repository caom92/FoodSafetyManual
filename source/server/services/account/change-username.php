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
      'min_length' => 3
    ],
    'user_id' => [
      'type' => 'int',
      'min' => 1,
      'optional' => true
    ]
  ],
  'callback' => function($scope, $request) {
    // get the session segment
    $segment = $scope->session->getSegment('fsm');
    $isAdmin = $segment->get('role_name') == 'Administrator';

    $users = $scope->daoFactory->get('Users');

    // then we check if the name is duplicated and if the password is valid
    $isNameDuplicated = $users->hasByLogInName($request['new_username']);
    $isPasswordValid = password_verify(
      $request['password'],
      $segment->get('login_password')
    );
    
    if ($isNameDuplicated) {
      throw new \Exception(
        'Failed to update username; new name is already taken.',
        1
      );
    }

    if (!$isPasswordValid) {
      throw new \Exception(
        'Failed to update username; the password is incorrect.',
        2
      );
    }

    $isUpdatingOtherUsername = 
      isset($request['user_id']) && array_key_exists('user_id', $request);
    if ($isUpdatingOtherUsername) {
      $isUpdatingOtherUsername = 
        $request['user_id'] != $segment->get('user_id');
    }

    if ($isUpdatingOtherUsername && !$isAdmin) {
      throw new \Exception(
        'Username could not be changed; changing the username of another '.
        'user is not allowed',
        3
      );
    }

    if ($isAdmin && $isUpdatingOtherUsername) {
      $userId = $request['user_id'];
    } else {
      $userId = $segment->get('user_id');
    }
    
    // if the password is not duplicated and the password is valid, then
    // update the user name
    $users->updateLogInNameByUserID(
      $userId,
      $request['new_username']
    );
  }
];

?>
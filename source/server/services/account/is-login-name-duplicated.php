<?php

$service = [
  'requirements_desc' => [
    'requirements_desc' => [
      'logged_in' => 'any',
      'login_name' => [
        'type' => 'string',
        'min_length' => 5
      ]
    ],
  ],
  'callback' => function($scope, $request) {
    return $scope->daoFactory->get('Users')
      ->hasByLogInName($request['login_name']);
  }
];

?>
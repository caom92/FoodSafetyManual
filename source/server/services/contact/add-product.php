<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'code' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 8
    ],
    'name' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 255
    ]
  ],
  'callback' => function($scope, $request) {
    return $scope->daoFactory->get('Products')->insert([
      'is_active' => TRUE,
      'code' => $request['code'],
      'name' => $request['name']
    ]);
  }
];

?>
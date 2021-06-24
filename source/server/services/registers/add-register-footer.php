<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'zone_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'register_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'footer' => [
      'type' => 'string',
      'max_length' => 65535
    ]
  ],
  'callback' => function($scope, $request) {
    $scope->daoFactory->get('RegisterFooters')->insert($request);
  }
];

?>
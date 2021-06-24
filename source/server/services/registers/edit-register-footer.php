<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'footer_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'footer' => [
      'type' => 'string',
      'max_length' => 65535
    ]
  ],
  'callback' => function($scope, $request) {
    $scope->daoFactory->get('RegisterFooters')->updateByID(
      $request['footer_id'],
      $request['footer']
    );
  }
];

?>
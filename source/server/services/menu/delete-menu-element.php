<?php

$service = [
  'requirements_desc' => [
    'logged_in' => 'any',
    'id' => [
      'type' => 'int',
      'min' => 1
    ]
  ],
  'callback' => function($scope, $request) {
    $scope->daoFactory->get('MenuItems')->deleteById($request['id']);
  }   
];

?>
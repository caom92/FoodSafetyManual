<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator']
  ],
  'callback' => function($scope, $request) {
    return $scope->daoFactory->get('Products')->selectAll();
  }
];

?>
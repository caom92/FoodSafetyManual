<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'product_id' => [
      'type' => 'int',
      'min' => 1
    ]
  ],
  'callback' => function($scope, $request) {
    return $scope->daoFactory->get('Products')
      ->toggleActivationByID($request['product_id']);
  }
];

?>
<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor'],
    'item_id' => [
      'type' => 'int',
      'min' => 1
    ]
  ],
  'callback' => function($scope, $request) {
    $scope->daoFactory->get('gmp\packing\preop\Items')
      ->toggleActivationByID($request['item_id']);
  }
];

?>
<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor'],
    'item_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'position' => [
      'type' => 'int'
    ]
  ],
  'callback' => function($scope, $request) {
    $scope->daoFactory->get('gmp\packing\preop\Items')->updatePositionByID(
      $request['item_id'], $request['position']);
  }
];

?>
<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor']
  ],
  'callback' => function($scope, $request) {
    return $scope->daoFactory->get('gmp\packing\preop\ItemTypes')
      ->selectAll();
  }
];

?>
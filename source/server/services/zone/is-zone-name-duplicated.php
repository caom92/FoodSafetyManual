<?php

$service = [
  'requirements_desc' => [
    'logged_in' => [ 'Administrator' ],
    'zone_name' => [
      'type'=> 'string',
      'length' => 3
    ]
  ],
  'callback' => function($scope, $request) {
    return $scope->daoFactory->get('Zones')->hasByName(
      $request['zone_name']);
  }
];

?>
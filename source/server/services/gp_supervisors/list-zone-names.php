<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator']
  ],
  'callback' => function($scope, $request) {
    $rows = $scope->daoFactory->get('Zones')->selectZoneNames();

    return $rows;
  }
];

?>
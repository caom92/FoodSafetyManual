<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor', 'Employee', 'Director', 'Manager'],
    'suffix' => [
      'type' => 'string'
    ]
  ],
  'callback' => function($scope, $request) {
    $row = $scope->daoFactory->get('Logs')->getManualURLBySuffix(
      $request['suffix']);
    $row['manual_location'] = 'data/documents/manuals/'.$row['manual_location'];
    return $row;
  }
];

?>
<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor', 'Employee'],
    'has_privileges' => [
      'privilege' => ['Read', 'Write'],
      'program' => 'GAP',
      'module' => 'Fields',
      'log' => 'Organic Program Verification & SRRC'
    ]
  ],
  'callback' => function($scope, $request) {
    return $scope->daoFactory->get('gap\packing\preop\CorrectiveActions')
      ->selectAllButOptionOther();
  }
];

?>
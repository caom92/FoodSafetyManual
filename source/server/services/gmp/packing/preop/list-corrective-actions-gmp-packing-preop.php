<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor', 'Employee'],
    'has_privileges' => [
      'privilege' => ['Read', 'Write'],
      'program' => 'GMP',
      'module' => 'Packing',
      'log' => 'Pre-Operational Inspection'
    ]
  ],
  'callback' => function($scope, $request) {
    return $scope->daoFactory->get('gmp\packing\preop\CorrectiveActions')
      ->selectAllButOptionOther();
  }
];

?>
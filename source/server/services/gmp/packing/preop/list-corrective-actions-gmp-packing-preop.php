<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor'],
    'has_privileges' => [
      'privilege' => 'Read',
      'program' => 'GMP',
      'module' => 'Packing',
      'log' => 'Pre-Operational Inspection'
    ]
  ],
  'callback' => function($scope, $request) {
    return $scope->daoFactory->get('gmp\packing\preop\CorrectiveActions')
      ->selectAllButNone();
  }
];

?>
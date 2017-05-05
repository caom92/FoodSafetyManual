<?php

$service = [
  'requirements_desc' => [
    'logged_in' => [ 'Administrator' ],
    'program_id' => [
      'type' => 'int',
      'min' => 1
    ]
  ],
  'callback' => function($scope, $request) {
    return $scope->daoFactory->get('Modules')
      ->selectByProgramID($request['program_id']);
  }
];

?>
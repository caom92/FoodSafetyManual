<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'zone_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'log_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'capture_form_footer' => [
      'type' => 'string',
      'max_length' => 65538
    ],
    'report_document_footer' => [
      'type' => 'string',
      'max_length' => 65538
    ]
  ],
  'callback' => function($scope, $request) {
    $scope->daoFactory->get('ReportFooters')->insert($request);
  }
];

?>
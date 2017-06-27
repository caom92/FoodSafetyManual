<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'footer_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'capture_form_footer' => [
      'type' => 'string',
      'max_length' => 65535
    ],
    'report_document_footer' => [
      'type' => 'string',
      'max_length' => 65535
    ]
  ],
  'callback' => function($scope, $request) {
    $scope->daoFactory->get('ReportFooters')->updateByID(
      $request['footer_id'],
      $request['capture_form_footer'],
      $request['report_document_footer']
    );
  }
];

?>
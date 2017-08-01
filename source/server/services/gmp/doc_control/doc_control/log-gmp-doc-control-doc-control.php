<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = [
  'requirements_desc' => [
    'logged_in' => ['Manager', 'Supervisor', 'Employee', 'Director'],
    'has_privileges' => [
      'privilege' => ['Read', 'Write'],
      'program' => 'GMP',
      'module' => 'Document Control',
      'log' => 'Document Control'
    ],
    'callback' => function($scope, $request) {
      // first, get the session segment
      $segment = $scope->session->getSegment('fsm');

      // retrieve the list of log items from the database
      $segment = $scope->session->getSegment('fsm');
      $items = $scope->daoFactory->get('gmp\docControl\docControl\Documents')
        ->selectActiveByZoneID($segment->get('zone_id'));

      // retrieve the footers for the capture form
      $footers = $scope->daoFactory->get('ReportFooters')
        ->getByZoneIDAndLogID(
          $segment->get('zone_id'),
          $scope->daoFactory->get('Logs')->getIDByNames(
            'GMP', 'Document Control', 'Document Control'
          )
        );

      // prepare the response JSON
      return [
        'zone_name' => $segment->get('zone_name'),
        'program_name' => $program,
        'module_name' => $module,
        'log_name' => $log,
        'html_footer' => $footers['form_footer'],
        'documents' => $items
      ];
    }
  ]
];

?>
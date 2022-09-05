<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createReportService(
  'GAP',
  'Fields',
  'Pest Control Inspection Flytrap',
  [
    'items_name' => 'Areas',
    'extra_info' => [
      // NULL
    ],
    'function' => function($scope, $segment, $logDate) {
      $areas = [];

      $areas = $scope->daoFactory->get('gap\packing\pestControlInspectionFlytrap\Logs')->selectWithNamesByCaptureDateID($logDate['id']);

      return [
        'areas' => $areas
      ];
    },
    'organization' => [
      'areas'
    ]
  ],
  FALSE,
  TRUE
);

?>
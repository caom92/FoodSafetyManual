<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createReportService(
  'GMP',
  'Packing',
  'Pest Control Inspection Exterior',
  [
    'items_name' => 'Areas',
    'extra_info' => [
      // NULL
    ],
    'function' => function($scope, $segment, $logDate) {
      $areas = [];

      $areas = $scope->daoFactory->get('gmp\packing\pestControlInspectionExterior\Logs')->selectWithNamesByCaptureDateID($logDate['id']);

      return [
        'areas' => $areas
      ];
    },
    'overview' => function($scope, $segment, $startDate, $endDate) {
      $capturedPestsOverview = $scope->daoFactory->get('gmp\packing\pestControlInspectionExterior\Logs')->selectTotalCapturedPestsByDateInterval($startDate, $endDate);

      return $capturedPestsOverview;
    },
    'organization' => [
      'areas'
    ]
  ],
  FALSE,
  TRUE,
  TRUE
);

?>
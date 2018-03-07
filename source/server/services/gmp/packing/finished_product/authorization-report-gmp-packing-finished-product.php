<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createAuthorizationReportService(
  'GMP',
  'Packing',
  'Daily Finished Product Check',
  [
    'items_name' => 'log_info',
    'extra_info' => [
      // NULL
    ],
    'function' => function($scope, $segment, $logDate) {
      // get the list of all entries from the database
      $entries = $scope->daoFactory->get('gmp\packing\finishedProduct\Logs')
        ->selectByCaptureDateID(
          $logDate['id']
        );

        // then, obtain the list of all suppliers
        $suppliers = $scope->daoFactory->get('Suppliers')->selectCode();

        // after that, obtain the list of products
        $products = $scope->daoFactory->get('Products')->selectCode();

        // then, obtain the list of customers
        $customers = $scope->daoFactory->get('Customers')->selectName();

        // and then, obtain the list of quality types
        $qualityTypes = $scope->daoFactory->get('QualityTypes')->selectAll();

        // finally, return the log info
        return [
          'quality_types' => $qualityTypes,
          'entries' => $entries
        ];
    }
  ]
);

?>
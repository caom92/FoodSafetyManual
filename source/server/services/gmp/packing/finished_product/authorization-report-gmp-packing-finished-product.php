<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createAuthorizationReportService(
  'GMP',
  'Packing',
  'Daily Finished Product Check',
  [
    'items_name' => 'items',
    'extra_info' => [
      // NULL
    ],
    'function' => function($scope, $segment, $logDate) {
      // get the list of all entries from the database
      $entries = $scope->daoFactory->get('gmp\packing\finishedProduct\Logs')
        ->selectByCaptureDateID(
          $logDate['id']
        );

        // and then, obtain the list of all production areas
        $areas = $scope->daoFactory
          ->get('gmp\packing\finishedProduct\ProductionAreas')->selectByZoneID(
            $segment->get('zone_id')
          );

        // then, obtain the list of all suppliers
        $suppliers = $scope->daoFactory->get('Suppliers')->selectCode();

        // after that, obtain the list of products
        $products = $scope->daoFactory->get('Products')->selectCode();

        // then, obtain the list of customers
        $customers = $scope->daoFactory->get('Customers')->selectName();

        // and then, obtain the list of quality types
        $qualityTypes = $scope->daoFactory->get('QualityTypes')->selectAll();

        $finalQualities = [];
        foreach ($qualityTypes as $type) {
          array_push($finalQualities, [
            'quality_id' => $type['id'],
            'name' => $type['name']
          ]);
        }

        // finally, return the log info
        return [
          'log_info' => [
            'production_areas' => $areas,
            'suppliers' => $suppliers,
            'product_codes' => $products,
            'customers' => $customers,
            'quality_types' => $finalQualities
          ],
          'entries' => $entries
        ];
    }
  ]
);

?>
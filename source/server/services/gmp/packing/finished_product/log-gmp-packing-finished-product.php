<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = fsm\createLogService(
  'GMP',
  'Packing',
  'Daily Finished Product Check',
  [
    'items_name' => 'log_info',
    'function' => function($scope, $segment) {
      // first, obtain the list of all production areas
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

      // finally, return the log info
      return [
        'production_areas' => $areas,
        'suppliers' => $suppliers,
        'product_codes' => $products,
        'customers' => $customers,
        'quality_types' => $qualityTypes
      ];
    }
  ]
);

?>
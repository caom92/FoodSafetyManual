<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createLogService(
  'GMP',
  'Packing',
  'QC Aged Product',
  [
    'items_name' => 'log_info',
    'function' => function($scope, $segment) {
      // and then, obtain the list of quality types
      $qualityTypes = $scope->daoFactory->get('QualityTypes')->selectAll();

      // then obtain the list of actions
      $actions = $scope->daoFactory->get('gmp\packing\agedProduct\Actions')
        ->selectAll();

      // finally, return the log info
      return [
        'actions' => $actions,
        'quality_types' => $qualityTypes
      ];
    }
  ]
);

?>
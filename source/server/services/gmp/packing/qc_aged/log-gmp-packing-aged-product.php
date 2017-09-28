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

      // finally, return the log info
      return $qualityTypes;
    }
  ]
);

?>
<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createLogService(
  'GMP',
  'Packing',
  'Revisión General de Producto Terminado',
  [
    'items_name' => 'log_info',
    'function' => function($scope, $segment) {
      $qualityTypes = $scope->daoFactory->get('gmp\packing\productRevision\QualityTypes')->selectAll();

      return [
        'quality_types' => $qualityTypes
      ];
    }
  ]
);

?>
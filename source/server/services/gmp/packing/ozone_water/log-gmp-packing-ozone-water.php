<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createLogService(
  'GMP',
  'Packing',
  'Ozone Water Test Log',
  [
    'items_name' => 'items',
    'function' => function($scope, $segment) {
      return $scope->daoFactory->get('gmp\packing\ozone\Machines')
        ->selectActiveByZoneID($segment->get('zone_id'));
    }
  ]
);

?>
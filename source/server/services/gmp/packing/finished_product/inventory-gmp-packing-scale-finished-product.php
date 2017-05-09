<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = fsm\createInventoryService(
  'GMP',
  'Packing',
  'Daily Finished Product Check',
  [],
  function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    return $scope->daoFactory
      ->get('gmp\packing\finishedProduct\ProductionAreas')->selectByZoneID(
        $segment->get('zone_id')
      );
  }
);

?>
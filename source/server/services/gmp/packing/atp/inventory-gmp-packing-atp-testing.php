<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createInventoryService(
  'GMP',
  'Packing',
  'Environmental ATP Testing',
  [],
  function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    return $scope->daoFactory->get('gmp\packing\atp\CheckAreas')
      ->selectByZoneID($segment->get('zone_id'));
  }
);

?>
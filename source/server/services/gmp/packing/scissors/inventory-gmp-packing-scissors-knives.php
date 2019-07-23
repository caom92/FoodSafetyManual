<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createInventoryService(
  'GMP',
  'Packing',
  'Daily Scissors & Knives Inspection',
  [
    
  ],
  function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    return $scope->daoFactory->get('gmp\packing\scissors\Groups')
      ->selectAllByZoneID($segment->get('zone_id'));
  }
);

?>
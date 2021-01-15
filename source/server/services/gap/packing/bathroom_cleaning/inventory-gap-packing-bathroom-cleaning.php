<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createInventoryService(
  'GAP',
  'Packing',
  'Bathroom Cleaning Record',
  [
    
  ],
  function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    return $scope->daoFactory->get('gap\packing\bathroomCleaning\Items')
      ->selectByZoneID($segment->get('zone_id'));
  }
);

?>
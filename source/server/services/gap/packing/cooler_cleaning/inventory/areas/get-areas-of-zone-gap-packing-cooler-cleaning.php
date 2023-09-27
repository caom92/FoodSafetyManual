<?php

require_once realpath(dirname(__FILE__).'/../../../../../service_creators.php');

$service = fsm\createInventoryService(
  'GAP',
  'Fields',
  'Cooler Cleaning Log',
  [
    
  ],
  function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    return $scope->daoFactory->get('gap\packing\coolerCleaning\Areas')
      ->selectActiveByZoneID($segment->get('zone_id'));
  }
);

?>

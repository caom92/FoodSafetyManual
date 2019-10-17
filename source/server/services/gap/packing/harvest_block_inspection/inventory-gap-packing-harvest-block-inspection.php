<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createInventoryService(
  'GAP',
  'Fields',
  'Pre-Harvest Block Inspection',
  [
    
  ],
  function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    return $scope->daoFactory->get('gap\packing\harvestBlockInspection\Questions')
      ->selectByZoneID($segment->get('zone_id'));
  }
);

?>
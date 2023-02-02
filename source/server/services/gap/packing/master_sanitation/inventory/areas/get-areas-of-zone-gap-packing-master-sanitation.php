<?php

require_once realpath(dirname(__FILE__).'/../../../../../service_creators.php');

$service = fsm\createInventoryService(
  'GAP',
  'Fields',
  'Master Sanitation Schedule',
  [
    
  ],
  function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    return $scope->daoFactory->get('gap\packing\masterSanitation\Areas')
      ->selectActiveByZoneID($segment->get('zone_id'));
  }
);

?>

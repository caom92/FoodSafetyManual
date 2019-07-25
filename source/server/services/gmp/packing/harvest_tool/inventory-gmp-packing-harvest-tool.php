<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createInventoryService(
  'GMP',
  'Packing',
  'Harvest Tool Accountability Program And Sanitizing Log',
  [
    
  ],
  function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    return $scope->daoFactory->get('gmp\packing\harvestTool\Tools')
      ->selectByZoneID($segment->get('zone_id'));
  }
);

?>
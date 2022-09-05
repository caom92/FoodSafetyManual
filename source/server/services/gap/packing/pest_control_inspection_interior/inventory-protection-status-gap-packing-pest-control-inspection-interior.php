<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createInventoryService(
  'GAP',
  'Fields',
  'Pest Control Inspection Interior',
  [
    
  ],
  function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    return $scope->daoFactory->get('gap\packing\pestControlInspectionInterior\ProtectionStatus')
      ->selectByZoneID($segment->get('zone_id'));
  }
);

?>
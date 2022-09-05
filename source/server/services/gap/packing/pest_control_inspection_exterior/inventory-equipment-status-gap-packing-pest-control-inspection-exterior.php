<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createInventoryService(
  'GAP',
  'Fields',
  'Pest Control Inspection Exterior',
  [
    
  ],
  function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    return $scope->daoFactory->get('gap\packing\pestControlInspectionExterior\EquipmentStatus')
      ->selectByZoneID($segment->get('zone_id'));
  }
);

?>
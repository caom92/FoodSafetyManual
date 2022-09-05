<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createInventoryService(
  'GAP',
  'Fields',
  'Pest Control Inspection Flytrap',
  [
    
  ],
  function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    return $scope->daoFactory->get('gap\packing\pestControlInspectionFlytrap\Tasks')
      ->selectByZoneID($segment->get('zone_id'));
  }
);

?>
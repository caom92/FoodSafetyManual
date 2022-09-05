<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createInventoryService(
  'GMP',
  'Packing',
  'Pest Control Inspection Interior',
  [
    
  ],
  function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    return $scope->daoFactory->get('gmp\packing\pestControlInspectionInterior\PestTypes')
      ->selectByZoneID($segment->get('zone_id'));
  }
);

?>
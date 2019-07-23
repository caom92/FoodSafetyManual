<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createInventoryService(
  'GMP',
  'Document Control',
  'Document Control',
  [
    
  ],
  function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    return $scope->daoFactory->get('gmp\docControl\docControl\Documents')
      ->selectByZoneID($segment->get('zone_id'));
  }
);

?>
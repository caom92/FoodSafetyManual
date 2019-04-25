<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createInventoryService(
  'GMP',
  'Packing',
  'ATP SystemSURE Luminometer',
  [

  ],
  function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');

    return $scope->daoFactory->get('gmp\packing\atpLuminometer\Items')
      ->selectAllByZoneID($segment->get('zone_id'));
  }
);

?>
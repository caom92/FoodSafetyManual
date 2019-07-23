<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createInventoryService(
  'GMP',
  'Packing',
  'Cold Room Temperature Control',
  [

  ],
  function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    return $scope->daoFactory->get('gmp\packing\coldRoomTemp\Rooms')
      ->selectAllByZoneID($segment->get('zone_id'));
  }
);

?>
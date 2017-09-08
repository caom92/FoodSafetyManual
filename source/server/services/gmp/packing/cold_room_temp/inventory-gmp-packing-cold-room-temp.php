<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createInventoryService(
  'GMP',
  'Packing',
  'Cold Room Temperature Control',
  [],
  function($scope, $request) {
    // retrieve the list of groups from the database
    return $scope->daoFactory->get('gmp\packing\coldRoomTemp\Rooms')
      ->selectAllByZoneID($scope->session->getSegment('fsm')->get('zone_id'));
  }
);

?>
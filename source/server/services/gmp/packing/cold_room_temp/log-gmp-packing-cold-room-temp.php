<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createLogService(
  'GMP',
  'Packing',
  'Cold Room Temperature Control',
  [
    'items_name' => 'items',
    'function' => function($scope, $segment) {
      // retrieve the list of thermometers from the database
      return $scope->daoFactory->get('gmp\packing\coldRoomTemp\Rooms')
        ->selectActiveByZoneID($segment->get('zone_id'));
    }
  ]
);

?>
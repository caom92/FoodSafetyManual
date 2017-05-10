<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = fsm\createLogService(
  'GMP',
  'Packing',
  'Daily Scissors & Knives Inspection',
  [
    'items_name' => 'items',
    'function' => function($scope, $segment) {
      // retrieve the list of knife groups from the database
      return $scope->daoFactory->get('gmp\packing\scissors\Groups')
        ->selectActiveByZoneID($segment->get('zone_id'));
    }
  ]
);

?>
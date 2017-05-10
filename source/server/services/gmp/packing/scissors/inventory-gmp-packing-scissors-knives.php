<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = fsm\createInventoryService(
  'GMP',
  'Packing',
  'Daily Scissors & Knives Inspection',
  [
    // NULL
  ],
  function($scope, $request) {
    // first, we get the session segment
    $segment = $scope->session->getSegment('fsm');

    // retrieve the list of groups from the database
    return $scope->daoFactory->get('gmp\packing\scissors\Groups')
      ->selectAllByZoneID($segment->get('zone_id'));
  }
);

?>
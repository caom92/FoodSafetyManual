<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createInventoryService(
  'GMP',
  'Packing',
  'Daily Thermometer Calibration Verification Check',
  [
    // NULL
  ],
  function($scope, $request) {
    // first, we get the session segment
    $segment = $scope->session->getSegment('fsm');

    // retrieve the list of groups from the database
    return $scope->daoFactory->get('gmp\packing\thermometers\Thermometers')
      ->selectAllByZoneID($segment->get('zone_id'));
  }
);

?>
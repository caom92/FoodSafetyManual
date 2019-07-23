<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createInventoryService(
  'GMP',
  'Packing',
  'Daily Equipment Calibration Check',
  [
    
  ],
  function($scope, $request) {
    // first, we get the session segment
    $segment = $scope->session->getSegment('fsm');

    // then get all the scale types
    $scaleTypes = $scope->daoFactory->get('gmp\packing\calibration\ScaleTypes')
      ->selectAll();

    // initialize the temporal storage for the list of scales 
    $scaleList = [];

    // visit each scale type
    foreach ($scaleTypes as $type) {
      // retrieve the scales of the especified type and zone
      $scales = $scope->daoFactory->get('gmp\packing\calibration\Scales')
        ->selectByZoneAndTypeID(
          $segment->get('zone_id'), $type['id']
        );

      // store the scales on the final array
      array_push($scaleList, [
        'id' => $type['id'],
        'name' => $type['name'],
        'items' => $scales
      ]);
    }

    // return the resulting scale list
    return $scaleList;
  }
);

?>
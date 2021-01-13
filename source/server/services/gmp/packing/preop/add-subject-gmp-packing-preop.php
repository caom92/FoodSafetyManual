<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createAddService(
  'GMP',
  'Packing',
  'Pre-Operational Inspection',
  [

  ],
  function($scope, $request) {
    $subjects = $scope->daoFactory->get('gmp\packing\preop\SubjectControl');
    $segment = $scope->session->getSegment('fsm');

    // check if subject in zone already exists
    $subjectExists = $subjects->hasByZoneID(
      $segment->get('zone_id')
    );

    // if it already exists, throw exception; otherwise, add to table
    if ($subjectExists) {
      throw new \Exception('Subject is defined only once per zone; you can enable or disable this field');
    } else {
      return $subjects->insert([
        'zone_id' => $segment->get('zone_id')
      ]);
    }
  }
);

?>
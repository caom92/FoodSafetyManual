<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createLogService(
  'GMP',
  'Packing',
  'Environmental ATP Testing',
  function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $areas = $scope->daoFactory->get('gmp\packing\atp\CheckAreas')
      ->selectByZoneID($segment->get('zone_id'));
    return [
      'zone_name' => $segment->get('zone_name'),
      'program_name' => 'GMP',
      'module_name' => 'Packing',
      'log_name' => 'Environmental ATP Testing',
      'areas' => $areas
    ];
  },
  TRUE);

?>
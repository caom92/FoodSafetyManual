<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createLogService(
  'GMP',
  'Packing',
  'Environmental ATP Testing',
  function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    return [
      'zone_name' => $segment->get('zone_name'),
      'program_name' => 'GMP',
      'module_name' => 'Packing',
      'log_name' => 'Environmental ATP Testing'
    ];
  },
  TRUE);

?>
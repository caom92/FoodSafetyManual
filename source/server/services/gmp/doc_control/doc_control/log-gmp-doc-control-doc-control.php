<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createLogService(
  'GMP',
  'Document Control',
  'Document Control',
  [
    'items_name' => 'documents',
    'function' => function($scope, $segment) {
      $segment = $scope->session->getSegment('fsm');
      return $scope->daoFactory->get('gmp\docControl\docControl\Documents')
        ->selectByZoneID($segment->get('zone_id'));
    }
  ]
);

?>
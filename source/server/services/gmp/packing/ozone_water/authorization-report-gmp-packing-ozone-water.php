<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createAuthorizationReportService(
  'GMP',
  'Packing',
  'Ozone Water Test Log',
  [
    'items_name' => 'items',
    'extra_info' => NULL,
    'function' => function($scope, $segment, $logDate) {
      return $scope->daoFactory->get('gmp\packing\ozone\Logs')
        ->selectByCaptureDateID($logDate['id']);
    }
  ]
);

?>
<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createReportService(
  'GMP',
  'Packing',
  'Cold Room Temperature Control',
  [
    'items_name' => 'items',
    'extra_info' => [ 'time' ],
    'function' => function($scope, $segment, $logDate) {
      // retrieve the per group log corresponding to this date
      return $scope->daoFactory->get('gmp\packing\coldRoomTemp\Logs')
        ->selectByCaptureDateID($logDate['id']);
    }
  ]
);

?>
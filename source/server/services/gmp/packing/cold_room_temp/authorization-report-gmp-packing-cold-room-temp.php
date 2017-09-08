<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createAuthorizationReportService(
  'GMP',
  'Packing',
  'Cold Room Temperature Control',
  [
    'items_name' => 'items',
    'extra_info' => NULL,
    'function' => function($scope, $segment, $logDate) {
      // recuperamos la bitacora de este cuarto frio correspondiente a la fecha 
      // especificada
      return $scope->daoFactory->get('gmp\packing\coldRoomTemp\Logs')
        ->selectByCaptureDateID($logDate['id']);
    }
  ]
);

?>
<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = fsm\createLogService(
  'GMP',
  'Packing',
  'Glass & Brittle Plastic Inspection',
  [
    'items_name' => 'areas',
    'function' => function($scope, $segment) {
      // TO DO
    }
  ]
);

?>
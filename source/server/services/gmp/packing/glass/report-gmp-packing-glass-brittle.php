<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = fsm\createReportService(
  'GMP',
  'Packing',
  'Glass & Brittle Plastic Inspection',
  [
    'items_name' => 'areas',
    'extra_info' => [
      'time',
      'notes'
    ],
    'function' => function($scope, $segment, $logDate) {
      // TO DO
    }
  ]
);

?>
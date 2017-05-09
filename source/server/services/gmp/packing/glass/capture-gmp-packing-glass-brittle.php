<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = fsm\createCaptureService(
  'GMP',
  'Packing',
  'Glass & Brittle Plastic Inspection',
  [
    // TO DO
  ],
  [
    'extra_info' => [
      'time',
      'notes'
    ],
    'function' => function($scope, $segment, $request, $logID) {
      // TO DO
    }
  ]
);

?>
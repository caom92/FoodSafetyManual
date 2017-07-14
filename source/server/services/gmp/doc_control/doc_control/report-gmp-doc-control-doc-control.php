<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createReportService(
  'GMP',
  'Document Control',
  'Document Control',
  [
    'items_name' => 'documents',
    'extra_info' => NULL,
    'function' => function($scope, $segment, $logDate) {
      // TO DO
    }
  ]
);

?>
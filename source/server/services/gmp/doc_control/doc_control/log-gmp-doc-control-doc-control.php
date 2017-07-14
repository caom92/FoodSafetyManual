<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createLogService(
  'GMP',
  'Document Control',
  'Document Control',
  [
    'items_name' => 'documents',
    'function' => function($scope, $segment) {
      // TO DO
    }
  ]
);

?>
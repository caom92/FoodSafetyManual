<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createInventoryService(
  'GMP',
  'Document Control',
  'Document Control',
  [
    // TO DO
  ],
  function($scope, $request) {
    // TO DO
  }
);

?>
<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = fsm\createAddService(
  'GMP',
  'Packing',
  'Glass & Brittle Plastic Inspection',
  [
    // TO DO
  ],
  function($scope, $request) {
    // TO DO
  }
);

?>
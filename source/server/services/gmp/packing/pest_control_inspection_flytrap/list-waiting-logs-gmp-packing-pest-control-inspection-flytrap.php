<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createLogListService(
  'GMP',
  'Packing',
  'Pest Control Inspection Flytrap'
);

?>
<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = fsm\createToggleService(
  'GMP',
  'Packing',
  'Daily Hand Washing Inspection',
  'gmp\packing\handWash\Characteristics'
);

?>
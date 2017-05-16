<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = fsm\createReorderService(
  'GMP',
  'Packing',
  'Pre-Operational Inspection',
  'gmp\packing\preop\Items'
);

?>
<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = fsm\createReorderService(
  'GMP',
  'Pest Control',
  'Self Inspection',
  'gmp\pestControl\selfInspection\Stations'
);

?>
<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createReorderService(
  'GMP',
  'Self Inspection',
  'Pest Control',
  'gmp\selfInspection\pestControl\Stations'
);

?>
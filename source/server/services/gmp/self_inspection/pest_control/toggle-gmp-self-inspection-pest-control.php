<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createToggleService(
  'GMP',
  'Self Inspection',
  'Pest Control',
  'gmp\selfInspection\pestControl\Stations'
);

?>
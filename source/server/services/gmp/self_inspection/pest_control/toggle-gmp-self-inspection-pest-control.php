<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createToggleService(
  'GMP',
  'Pest Control',
  'Self Inspection',
  'gmp\selfInspection\pestControl\Stations'
);

?>
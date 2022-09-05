<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createToggleService(
  'GMP',
  'Packing',
  'Pest Control Inspection Flytrap',
  'gmp\packing\pestControlInspectionFlytrap\PestTypes'
);

?>
<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createToggleService(
  'GMP',
  'Packing',
  'Pest Control Inspection Interior',
  'gmp\packing\pestControlInspectionInterior\Tasks'
);

?>
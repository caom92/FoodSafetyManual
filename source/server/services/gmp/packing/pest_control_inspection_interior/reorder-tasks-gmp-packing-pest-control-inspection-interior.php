<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createReorderService(
  'GMP',
  'Packing',
  'Pest Control Inspection Interior',
  'gmp\packing\pestControlInspectionInterior\Tasks'
);

?>
<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUploadManualService(
  'GMP',
  'Packing',
  'Pest Control Inspection Flytrap',
  'gmp/packing/pest_control_inspection_flytrap/'
);

?>
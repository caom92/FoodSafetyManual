<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = fsm\createUploadManualService(
  'GMP',
  'Pest Control',
  'Self Inspection',
  'gmp/pest_control/self_inspection/'
);

?>
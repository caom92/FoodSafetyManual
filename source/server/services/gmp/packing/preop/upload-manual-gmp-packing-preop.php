<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = fsm\createUploadManualService(
  'GMP',
  'Packing',
  'Pre-Operational Inspection',
  'gmp/pracking/preop/'
);

?>
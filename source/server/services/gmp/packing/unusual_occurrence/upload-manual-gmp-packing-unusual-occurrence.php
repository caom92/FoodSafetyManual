<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');
use fsm;

$service = fsm\createUploadManualService(
  'GMP',
  'Packing',
  'Daily Notice of Unusual Occurrence and Corrective Action Report',
  'gmp/pracking/unusual_occurrence/'
);

?>
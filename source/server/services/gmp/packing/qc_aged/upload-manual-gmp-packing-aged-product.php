<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUploadManualService(
  'GMP',
  'Packing',
  'QC Aged Product',
  'gmp/packing/qc_aged/'
);

?>
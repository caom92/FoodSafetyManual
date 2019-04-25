<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUploadManualService(
  'GMP',
  'Packing',
  'ATP SystemSURE Luminometer',
  'gmp/packing/atp_luminometer/'
);

?>
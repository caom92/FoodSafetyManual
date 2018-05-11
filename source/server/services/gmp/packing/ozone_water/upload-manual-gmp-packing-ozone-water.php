<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUploadManualService(
  'GMP',
  'Packing',
  'Ozone Water Test Log',
  'gmp/packing/ozone_water/'
);

?>
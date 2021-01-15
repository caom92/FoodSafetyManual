<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUploadManualService(
  'GMP',
  'Packing',
  'Bathroom Cleaning Record',
  'gmp/packing/bathromm_cleaning/'
);

?>
<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUploadManualService(
  'GMP',
  'Packing',
  'Daily Scissors & Knives Inspection',
  'gmp/packing/scissors/'
);

?>
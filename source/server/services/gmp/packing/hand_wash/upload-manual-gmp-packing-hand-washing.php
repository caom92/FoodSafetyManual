<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUploadManualService(
  'GMP',
  'Packing',
  'Daily Hand Washing Inspection',
  'gmp/packing/hand_wash/'
);

?>
<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUploadManualService(
  'GMP',
  'Self Inspection',
  'Pest Control',
  'gmp/self_inspection/pest_control/'
);

?>
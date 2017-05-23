<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUploadManualService(
  'GMP',
  'Pest Control',
  'Self Inspection',
  'gmp/self_inspection/pest_control/'
);

?>
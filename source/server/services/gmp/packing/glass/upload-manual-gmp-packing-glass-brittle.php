<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUploadManualService(
  'GMP',
  'Packing',
  'Glass & Brittle Plastic Inspection',
  'gmp/packing/glass/'
);

?>
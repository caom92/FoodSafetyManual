<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createUploadManualService(
  'GMP',
  'Packing',
  'Cutting Tool Accountability Program And Sanitizing Log',
  'gmp/packing/harvest_tool/'
);

?>
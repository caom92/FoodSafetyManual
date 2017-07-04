<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUploadManualService(
  'GAP',
  'Packing',
  'Pre-Operational Inspection',
  'gap/packing/preop/'
);

?>
<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUploadManualService(
  'GAP',
  'Fields',
  'Pest Control Inspection Flytrap',
  'gap/packing/pest_control_inspection_flytrap/'
);

?>
<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createUploadManualService(
  'GPA',
  'Fields',
  'Pre-Harvest Block Inspection',
  'gap/packing/harvest_block_inspection/'
);

?>
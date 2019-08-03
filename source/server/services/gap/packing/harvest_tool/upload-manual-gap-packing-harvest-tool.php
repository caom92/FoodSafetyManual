<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createUploadManualService(
  'GAP',
  'Fields',
  'Harvest Tool Accountability Program And Sanitizing Log',
  'gap/packing/harvest_tool/'
);

?>
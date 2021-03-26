<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createUploadManualService(
  'GPA',
  'Fields',
  'Harvest Machine Cleaning',
  'gap/packing/harvest_machine_cleaning/'
);

?>
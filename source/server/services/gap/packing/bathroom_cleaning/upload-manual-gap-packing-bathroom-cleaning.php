<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUploadManualService(
  'GAP',
  'Fields',
  'Bathroom Cleaning Record',
  'gap/packing/bathromm_cleaning/'
);

?>
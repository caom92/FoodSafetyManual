<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUploadManualService(
  'GAP',
  'Fields',
  'Organic Program Verification & SRRC',
  'gap/packing/preop/'
);

?>
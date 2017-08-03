<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createReorderService(
  'GAP',
  'Fields',
  'Organic Program Verification & SRRC',
  'gap\packing\preop\WorkingAreas'
);

?>
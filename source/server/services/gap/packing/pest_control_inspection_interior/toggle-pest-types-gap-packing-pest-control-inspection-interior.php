<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createToggleService(
  'GAP',
  'Fields',
  'Pest Control Inspection Interior',
  'gap\packing\pestControlInspectionInterior\PestTypes'
);

?>
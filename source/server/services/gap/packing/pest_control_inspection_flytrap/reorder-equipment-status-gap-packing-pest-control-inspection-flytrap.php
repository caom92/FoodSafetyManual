<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createReorderService(
  'GAP',
  'Fields',
  'Pest Control Inspection Flytrap',
  'gap\packing\pestControlInspectionFlytrap\EquipmentStatus'
);

?>
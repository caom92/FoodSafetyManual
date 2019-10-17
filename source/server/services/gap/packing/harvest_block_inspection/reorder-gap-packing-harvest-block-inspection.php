<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createReorderService(
  'GAP',
  'Fields',
  'Pre-Harvest Block Inspection',
  'gap\packing\harvestBlockInspection\Questions'
);

?>
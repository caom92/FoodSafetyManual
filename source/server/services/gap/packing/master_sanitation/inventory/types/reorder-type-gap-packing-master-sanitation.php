<?php

require_once realpath(dirname(__FILE__).'/../../../../../service_creators.php');

$service = fsm\createReorderService(
  'GAP',
  'Fields',
  'Master Sanitation Schedule',
  'gap\packing\masterSanitation\Types'
);

?>
<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createReorderService(
  'GMP',
  'Packing',
  'Harvest Tool Accountability Program And Sanitizing Log',
  'gmp\packing\harvestTool\Tools'
);

?>
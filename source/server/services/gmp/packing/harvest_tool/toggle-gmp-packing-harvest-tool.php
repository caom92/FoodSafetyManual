<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createToggleService(
  'GMP',
  'Packing',
  'Cutting Tool Accountability Program And Sanitizing Log',
  'gmp\packing\harvestTool\Tools'
);

?>
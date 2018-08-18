<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createToggleService(
  'GMP',
  'Packing',
  'Ozone Water Test Log',
  'gmp\packing\ozone\MachinesFields'
);

?>
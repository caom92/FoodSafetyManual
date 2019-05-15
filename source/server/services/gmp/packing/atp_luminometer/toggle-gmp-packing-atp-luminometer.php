<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createToggleService(
  'GMP',
  'Packing',
  'ATP SystemSURE Luminometer',
  'gmp\packing\atpLuminometer\Items'
);

?>
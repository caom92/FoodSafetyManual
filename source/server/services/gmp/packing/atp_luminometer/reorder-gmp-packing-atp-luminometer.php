<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createReorderService(
  'GMP',
  'Packing',
  'ATP SystemSURE Luminometer',
  'gmp\packing\atpLuminometer\Items'
);

?>
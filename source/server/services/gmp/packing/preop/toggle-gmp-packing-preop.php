<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createToggleService(
  'GMP',
  'Packing',
  'Pre-Operational Inspection',
  'gmp\packing\preop\Items'
);

?>
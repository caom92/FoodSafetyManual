<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createToggleService(
  'GMP',
  'Packing',
  'Bathroom Cleaning Record',
  'gmp\packing\handWash\Items'
);

?>
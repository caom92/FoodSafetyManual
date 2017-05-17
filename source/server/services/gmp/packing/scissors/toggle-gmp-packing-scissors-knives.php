<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createToggleService(
  'GMP',
  'Packing',
  'Daily Scissors & Knives Inspection',
  'gmp\packing\scissors\Groups'
);

?>
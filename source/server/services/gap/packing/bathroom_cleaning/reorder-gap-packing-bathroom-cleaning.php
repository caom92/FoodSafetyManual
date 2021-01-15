<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createReorderService(
  'GAP',
  'Packing',
  'Bathroom Cleaning Record',
  'gap\packing\bathroomCleaning\Items'
);

?>
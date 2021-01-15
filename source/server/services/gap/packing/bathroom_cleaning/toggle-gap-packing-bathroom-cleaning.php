<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createToggleService(
  'GAP',
  'Packing',
  'Bathroom Cleaning Record',
  'gap\packing\handWash\Items'
);

?>
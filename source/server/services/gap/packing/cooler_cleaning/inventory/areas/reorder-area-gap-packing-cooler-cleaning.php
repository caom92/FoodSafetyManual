<?php

require_once realpath(dirname(__FILE__).'/../../../../../service_creators.php');

$service = fsm\createReorderService(
  'GAP',
  'Fields',
  'Cooler Cleaning Log',
  'gap\packing\coolerCleaning\Areas'
);

?>
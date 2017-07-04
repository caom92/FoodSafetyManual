<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createToggleService(
  'GAP',
  'Packing',
  'Pre-Operational Inspection',
  'gap\packing\preop\Items'
);

?>
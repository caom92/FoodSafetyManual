<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createToggleService(
  'GAP',
  'Fields',
  'Pre Operativo Diario',
  'gap\packing\preop\Items'
);

?>
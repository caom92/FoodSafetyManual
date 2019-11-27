<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createToggleService(
  'GAP',
  'Self Inspection',
  'Pest Control & Log',
  'gap\selfInspection\pestControl\Stations'
);

?>
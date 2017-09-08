<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createToggleService(
  'GMP',
  'Packing',
  'Cold Room Temperature Control',
  'gmp\packing\coldRoomTemp\Rooms'
);

?>
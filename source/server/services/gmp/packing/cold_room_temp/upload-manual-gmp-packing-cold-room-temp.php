<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUploadManualService(
  'GMP',
  'Packing',
  'Cold Room Temperature Control',
  'gmp/packing/cold_room_temp/'
);

?>
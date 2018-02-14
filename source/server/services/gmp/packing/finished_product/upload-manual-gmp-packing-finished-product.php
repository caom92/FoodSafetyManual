<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUploadManualService(
  'GMP',
  'Packing',
  'Daily Finished Product Check',
  'gmp/packing/finished_product/'
);

?>
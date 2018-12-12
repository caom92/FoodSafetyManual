<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createToggleService(
  'GMP',
  'Packing',
  'Daily Equipment Calibration Check',
  'gmp\packing\calibration\Scales'
);

?>
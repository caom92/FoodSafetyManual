<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUploadManualService(
  'GMP',
  'Packing',
  'Revisión General de Producto Terminado',
  'gmp/packing/product_revision/'
);

?>
<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUploadManualService(
  'GMP',
  'Document Control',
  'Document Control',
  'gmp/doc_control/doc_control/'
);

?>
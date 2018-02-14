<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUploadManualService(
  'GMP',
  'Others',
  'Daily Notice of Unusual Occurrence and Corrective Action Report',
  'gmp/others/unusual_occurrence/'
);

?>
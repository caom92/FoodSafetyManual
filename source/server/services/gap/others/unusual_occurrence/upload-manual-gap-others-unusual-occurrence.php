<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUploadManualService(
  'GAP',
  'Others',
  'Daily Notice of Unusual Occurrence and Corrective Action Report',
  'gap/others/unusual_occurrence/'
);

?>
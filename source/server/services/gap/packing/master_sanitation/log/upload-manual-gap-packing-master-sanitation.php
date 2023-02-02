<?php

require_once realpath(dirname(__FILE__).'/../../../../service_creators.php');


$service = fsm\createUploadManualService(
  'GAP',
  'Fields',
  'Master Sanitation Schedule',
  'gap/packing/master_sanitation/'
);

?>
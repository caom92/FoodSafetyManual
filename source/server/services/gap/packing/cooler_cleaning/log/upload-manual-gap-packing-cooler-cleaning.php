<?php

require_once realpath(dirname(__FILE__).'/../../../../service_creators.php');


$service = fsm\createUploadManualService(
  'GAP',
  'Fields',
  'Cooler Cleaning Log',
  'gap/packing/cooler_cleaning/'
);

?>
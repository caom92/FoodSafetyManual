<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createToggleService(
  'GAP',
  'Document Control',
  'Document Control',
  'gap\docControl\docControl\Documents'
);

?>
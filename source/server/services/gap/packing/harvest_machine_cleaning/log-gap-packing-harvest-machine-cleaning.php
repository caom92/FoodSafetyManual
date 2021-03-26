<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createLogService(
  'GAP',
  'Fields',
  'Harvest Machine Cleaning',
  [
    'items_name' => 'machines',
    'function' => function($scope, $segment) {
      $machines = array();

      return $machines;
    }
  ]);

?>
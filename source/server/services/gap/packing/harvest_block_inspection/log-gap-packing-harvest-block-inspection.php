<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createLogService(
  'GAP',
  'Fields',
  'Pre-Harvest Block Inspection',
  [
    'items_name' => 'items',
    'function' => function($scope, $segment) {
      // retrieve the list of questions from the database
      return $scope->daoFactory->get('gap\packing\harvestBlockInspection\Questions')
        ->selectActiveByZoneID($segment->get('zone_id'));
    }
  ]
);

?>
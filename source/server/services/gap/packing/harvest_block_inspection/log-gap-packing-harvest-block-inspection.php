<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createLogService(
  'GAP',
  'Fields',
  'Pre-Harvest Block Inspection',
  [
    'items_name' => 'items',
    'function' => function($scope, $segment) {
      return [
        // retrieve the list of questions from the database
        'items' => $scope->daoFactory->get('gap\packing\harvestBlockInspection\Questions')->selectActiveByZoneID($segment->get('zone_id')),
        // retrieve the list of unit types from the database
        'unit_types' => $scope->daoFactory->get('gap\packing\harvestBlockInspection\UnitTypes')->selectAll()
      ];
    },
    'organization' => [
      'items',
      'unit_types'
    ],
  ],
  FALSE,
  TRUE
);

?>
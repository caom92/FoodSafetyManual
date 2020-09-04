<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createReportService(
  'GAP',
  'Fields',
  'Pre-Harvest Block Inspection',
  [
    'items_name' => 'items',
    'extra_info' => [
      // NULL
    ],
    'function' => function($scope, $segment, $logDate) {
      $info = $scope->daoFactory->get('gap\packing\harvestBlockInspection\InfoLogs')
        ->selectByCaptureDateID($logDate['id'])[0];

      $items = [
        'items' => $scope->daoFactory->get('gap\packing\harvestBlockInspection\QuestionLogs')->selectByCaptureDateID($logDate['id']),
        'unit_types' => $scope->daoFactory->get('gap\packing\harvestBlockInspection\UnitTypes')->selectAll()
      ];

      return array_merge($info, $items);
    },
    'organization' => [
      'inspection_start_date',
      'inspection_start_time',
      'inspection_end_date',
      'inspection_end_time',
      'commodities',
      'units',
      'unit_type',
      'grower',
      'block_code',
      'contact',
      'location',
      'country',
      'items',
      'unit_types'
    ]
  ],
  FALSE,
  TRUE
);

?>
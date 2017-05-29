<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createAuthorizationReportService(
  'GMP',
  'Packing',
  'Daily Scissors & Knives Inspection',
  [
    'items_name' => 'items',
    'extra_info' => [
      'notes',
    ],
    'function' => function($scope, $segment, $logDate) {
      // retrieve the per group log corresponding to this date
      $data = $scope->daoFactory->get('gmp\packing\scissors\Logs')
        ->selectByCaptureDateID($logDate['id']);
      return [
        'id' => $data['id'],
        'name' => $data['name'],
        'time' => $data['time'],
        'quantity' => $data['quantity'],
        'approved' => $data['approved'],
        'condition' => $data['condition'],
        'corrective_action' => $data['corrective_action'],
        'is_sanitized' => $data['is_sanitized'],
      ];
    }
  ]
);

?>
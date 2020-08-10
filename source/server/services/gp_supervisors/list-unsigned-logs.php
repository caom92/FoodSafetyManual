<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['GP Supervisor'],
    'zone_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'log_id' => [
      'type' => 'int',
      'min' => 1
    ]
  ],
  'callback' => function($scope, $request) {    
    $capturedLogs = $scope->daoFactory->get('CapturedLogs'); 

    return $capturedLogs->selectUnsignedLogsByLogIDAndZoneID($request['log_id'], $request['zone_id']);
  }
];

?>
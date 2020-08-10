<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'id' => [
      'type' => 'int',
      'min' => 1
    ],
    'zones' => [
      'type' => 'array',
      'values' => [
        'id' => [
          'type' => 'int',
          'min' => 1
        ]
      ]
    ]
  ],
  'callback' => function($scope, $request) {
    $assignedZones = $scope->daoFactory->get('gpSupervisors\AssignedZones');
    // Delete all existing zones for the user, in case any were unselected
    $assignedZones->deleteByUserID($request['id']);

    // Get all the zones that should be assigned to a GP supervisor
    $zones = (isset($request['zones']) && array_key_exists('zones', $request)) ? $request['zones'] : [];

    // Add all zones sent in the request
    if (count($zones) > 0) {
      foreach($zones as $zone) {
        $assignedZones->insert([
          'user_id' => $request['id'],
          'zone_id' => $zone['id']
        ]);
      }
    }
  }
];

?>
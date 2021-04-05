<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Employee', 'Supervisor', 'Manager', 'Director'],
    'date' => [
      'type' => 'datetime',
      'format' => 'Y-m-d',
      'optional' => true
    ],
    'crop' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 255,
      'optional' => true
    ],
    'variety' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 255,
      'optional' => true
    ],
    'section' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 255,
      'optional' => true
    ],
    'block' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 255,
      'optional' => true
    ],
    'weight' => [
      'type' => 'int',
      'min' => 1,
      'optional' => true
    ],
    'people' => [
      'type' => 'int',
      'min' => 1,
      'optional' => true
    ],
    'hours' => [
      'type' => 'int',
      'min' => 1,
      'optional' => true
    ]
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $cropRegistryLogs = $scope->daoFactory->get('cropRegistry\Logs');

    $zoneID = $segment->get('zone_id');
    $userID = $segment->get('user_id');

    $registerID = $cropRegistryLogs->insert([
      'submitter_id' => $userID,
      'zone_id' => $zoneID,
      'date' => (isset($request['date']) && array_key_exists('date', $request)) ? $request['date'] : NULL,
      'crop' => (isset($request['crop']) && array_key_exists('crop', $request)) ? $request['crop'] : NULL,
      'variety' => (isset($request['variety']) && array_key_exists('variety', $request)) ? $request['variety'] : NULL,
      'section' => (isset($request['section']) && array_key_exists('section', $request)) ? $request['section'] : NULL,
      'block' => (isset($request['block']) && array_key_exists('block', $request)) ? $request['block'] : NULL,
      'weight' => (isset($request['weight']) && array_key_exists('weight', $request)) ? $request['weight'] : NULL,
      'people' => (isset($request['people']) && array_key_exists('people', $request)) ? $request['people'] : NULL,
      'hours' => (isset($request['hours']) && array_key_exists('hours', $request)) ? $request['hours'] : NULL
    ]);

    return $registerID;
  }
];

?>
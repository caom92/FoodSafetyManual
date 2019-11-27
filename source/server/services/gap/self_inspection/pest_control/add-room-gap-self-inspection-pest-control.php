<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor'],
    'has_privileges' => [
      'privilege' => 'Read',
      'program' => 'GAP',
      'module' => 'Self Inspection',
      'log' => 'Pest Control & Log'
    ],
    'area_name' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 255
    ]
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $rooms = $scope->daoFactory->get('gap\selfInspection\pestControl\Rooms');
    $isNameDuplicated = $rooms->hasByZoneIDAndName(
      $segment->get('zone_id'), 
      $request['area_name']
    );

    if ($isNameDuplicated) {
      throw new \Exception(
        'Failed to add new room; the name is already taken', 
        1
      );
    }

    return  $rooms->insert([
      'zone_id' => $segment->get('zone_id'),
      'name' => $request['area_name']
    ]);
  }
];

?>
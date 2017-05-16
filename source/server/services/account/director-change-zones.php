<?php

require_once realpath(dirname(__FILE__)).'/function.php';

$service = [
  'requirements_desc' => [
    'logged_in' => ['Director'],
    'zone_id' => [
      'type' => 'int',
      'min' => 1
    ]
  ],
  'callback' => function($scope, $request) {
    // get the session segment
    $segment = $scope->session->getSegment('fsm');

    // get the info of the zone using the ID
    $zone = $scope->daoFactory->get('Zones')->getByID($request['zone_id']);
    
    // check if the zone exists
    if (!isset($zone)) {
      // if not, notify the user
      throw new \Exception(
        "No zone with ID ".$request['zone_id']." could be find"
      );
    }

    // update the zone info associated with the account's session
    \resetSessionID($scope->session, $segment);
    $segment->set('zone_id', $zone['id']);
    $segment->set('zone_name', $zone['name']);

    // return the info of the new zone
    return $zone;
  }
];

?>
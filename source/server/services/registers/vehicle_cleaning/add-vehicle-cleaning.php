<?php

require_once realpath(dirname(__FILE__).'/../../service_creators.php');

$service = fsm\createAddRegisterService(
  'vehicle-cleaning',
  [
    'license_plate' => [
      'type' => 'string',
      'max_length' => 255
    ],
    'disinfection' => [
      'type' => 'int'
    ],
    'water_rinse' => [
      'type' => 'bool'
    ],
    'conditions' => [
      'type' => 'bool'
    ],
    'contamination_free' => [
      'type' => 'bool'
    ],
    'corrective_action' => [
      'type' => 'string',
      'max_length' => 65535
    ],
    'initials' => [
      'type' => 'string',
      'max_length' => 255
    ]
  ],
  function($scope, $request, $capturedRegisterID) {
    $segment = $scope->session->getSegment('fsm');
    $vehicleCleaningLogs = $scope->daoFactory->get('vehicleCleaning\Logs');
    $zoneID = $segment->get('zone_id');

    $registerID = $vehicleCleaningLogs->insert([
      'captured_register_id' => $capturedRegisterID,
      'license_plate' => $request['license_plate'],
      'disinfection' => $request['disinfection'],
      'water_rinse' => $request['water_rinse'],
      'conditions' => $request['conditions'],
      'contamination_free' => $request['contamination_free'],
      'corrective_action' => $request['corrective_action'],
      'initials' => $request['initials']
    ]);

    return [
      'id' => $registerID,
      'captured_register_id' => $capturedRegisterID,
      'capture_date' => $request['date'],
      'license_plate' => $request['license_plate'],
      'disinfection' => $request['disinfection'],
      'water_rinse' => $request['water_rinse'],
      'conditions' => $request['conditions'],
      'contamination_free' => $request['contamination_free'],
      'corrective_action' => $request['corrective_action'],
      'initials' => $request['initials'],
      'zone_id' => $zoneID
    ];
  }
);

?>
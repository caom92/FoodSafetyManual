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
      'type' => 'int',
      'optional' => true
    ],
    'water_rinse' => [
      'type' => 'bool',
      'optional' => true
    ],
    'conditions' => [
      'type' => 'bool',
      'optional' => true
    ],
    'contamination_free' => [
      'type' => 'bool',
      'optional' => true
    ],
    'corrective_action' => [
      'type' => 'string',
      'max_length' => 65535,
      'optional' => true
    ],
    'initials' => [
      'type' => 'string',
      'max_length' => 255,
      'optional' => true
    ]
  ],
  function($scope, $request, $capturedRegisterID) {
    $segment = $scope->session->getSegment('fsm');
    $vehicleCleaningLogs = $scope->daoFactory->get('vehicleCleaning\Logs');
    $zoneID = $segment->get('zone_id');

    $registerID = $vehicleCleaningLogs->insert([
      'captured_register_id' => $capturedRegisterID,
      'license_plate' => (isset($request['license_plate']) && array_key_exists('license_plate', $request)) ? $request['license_plate'] : NULL,
      'disinfection' => (isset($request['disinfection']) && array_key_exists('disinfection', $request)) ? $request['disinfection'] : NULL,
      'water_rinse' => (isset($request['water_rinse']) && array_key_exists('water_rinse', $request)) ? $request['water_rinse'] : NULL,
      'conditions' => (isset($request['conditions']) && array_key_exists('conditions', $request)) ? $request['conditions'] : NULL,
      'contamination_free' => (isset($request['contamination_free']) && array_key_exists('contamination_free', $request)) ? $request['contamination_free'] : NULL,
      'corrective_action' => (isset($request['corrective_action']) && array_key_exists('corrective_action', $request)) ? $request['corrective_action'] : NULL,
      'initials' => (isset($request['initials']) && array_key_exists('initials', $request)) ? $request['initials'] : NULL
    ]);

    return [
      'id' => $registerID,
      'captured_register_id' => $capturedRegisterID,
      'capture_date' => $request['date'],
      'license_plate' => (isset($request['license_plate']) && array_key_exists('license_plate', $request)) ? $request['license_plate'] : NULL,
      'disinfection' => (isset($request['disinfection']) && array_key_exists('disinfection', $request)) ? $request['disinfection'] : NULL,
      'water_rinse' => (isset($request['water_rinse']) && array_key_exists('water_rinse', $request)) ? $request['water_rinse'] : NULL,
      'conditions' => (isset($request['conditions']) && array_key_exists('conditions', $request)) ? $request['conditions'] : NULL,
      'contamination_free' => (isset($request['contamination_free']) && array_key_exists('contamination_free', $request)) ? $request['contamination_free'] : NULL,
      'corrective_action' => (isset($request['corrective_action']) && array_key_exists('corrective_action', $request)) ? $request['corrective_action'] : NULL,
      'initials' => (isset($request['initials']) && array_key_exists('initials', $request)) ? $request['initials'] : NULL,
      'zone_id' => $zoneID
    ];
  }
);

?>
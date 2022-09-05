<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createCaptureService(
  'GMP',
  'Packing',
  'Pest Control Inspection Interior',
  [
    'areas' => [
      'type' => 'array',
      'values' => [
        'id' => [
          'type' => 'int',
          'min' => 1
        ],
        'protection_status_id' => [
          'type' => 'int',
          'min' => 1,
          'optional' => true
        ],
        'equipment_status_id' => [
          'type' => 'int',
          'min' => 1,
          'optional' => true
        ],
        'pest_type_id' => [
          'type' => 'int',
          'min' => 1,
          'optional' => true
        ],
        'area_verification_id' => [
          'type' => 'int',
          'min' => 1,
          'optional' => true
        ],
        'task_id' => [
          'type' => 'int',
          'min' => 1,
          'optional' => true
        ],
        'captured_pests' => [
          'type' => 'int',
          'optional' => true
        ],
        'corrective_action_id' => [
          'type' => 'int',
          'min' => 1,
          'optional' => true
        ],
        'observations' => [
          'type' => 'string',
          'optional' => true
        ]
      ]
    ]
  ],
  [
    'extra_info' => [
      // NULL
    ],
    'function' => function($scope, $segment, $request, $logID) {
      $logs = $scope->daoFactory->get('gmp\packing\pestControlInspectionInterior\Logs');

      $logData = [];

      foreach ($request['areas'] as $area) {
        array_push($logData, [
          'capture_date_id' => $logID,
          'area_id' => $area['id'],
          'protection_status_id' => (isset($area['protection_status_id']) && array_key_exists('protection_status_id', $area)) ? $area['protection_status_id'] : NULL,
          'equipment_status_id' => (isset($area['equipment_status_id']) && array_key_exists('equipment_status_id', $area)) ? $area['equipment_status_id'] : NULL,
          'pest_type_id' => (isset($area['pest_type_id']) && array_key_exists('pest_type_id', $area)) ? $area['pest_type_id'] : NULL,
          'area_verification_id' => (isset($area['area_verification_id']) && array_key_exists('area_verification_id', $area)) ? $area['area_verification_id'] : NULL,
          'task_id' => (isset($area['task_id']) && array_key_exists('task_id', $area)) ? $area['task_id'] : NULL,
          'captured_pests' => (isset($area['captured_pests']) && array_key_exists('captured_pests', $area)) ? $area['captured_pests'] : NULL,
          'corrective_action_id' => (isset($area['corrective_action_id']) && array_key_exists('corrective_action_id', $area)) ? $area['corrective_action_id'] : NULL,
          'observations' => (isset($area['observations']) && array_key_exists('observations', $area)) ? $area['observations'] : NULL
        ]);
      }

      $insertedRows = $logs->insert($logData);

      return $insertedRows;
    }
  ],
  FALSE,
  TRUE
);

?>
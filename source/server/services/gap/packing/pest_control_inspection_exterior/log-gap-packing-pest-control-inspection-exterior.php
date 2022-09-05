<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createLogService(
  'GAP',
  'Fields',
  'Pest Control Inspection Exterior',
  [
    'items_name' => 'areas',
    'function' => function($scope, $segment) {
      return [
        'area_verifications' => $scope->daoFactory->get('gap\packing\pestControlInspectionExterior\AreaVerification')->selectActiveByZoneID($segment->get('zone_id')),
        'corrective_actions' => $scope->daoFactory->get('gap\packing\pestControlInspectionExterior\CorrectiveActions')->selectActiveByZoneID($segment->get('zone_id')),
        'equipment_status' => $scope->daoFactory->get('gap\packing\pestControlInspectionExterior\EquipmentStatus')->selectActiveByZoneID($segment->get('zone_id')),
        'pest_types' => $scope->daoFactory->get('gap\packing\pestControlInspectionExterior\PestTypes')->selectActiveByZoneID($segment->get('zone_id')),
        'protection_status' => $scope->daoFactory->get('gap\packing\pestControlInspectionExterior\ProtectionStatus')->selectActiveByZoneID($segment->get('zone_id')),
        'tasks' => $scope->daoFactory->get('gap\packing\pestControlInspectionExterior\Tasks')->selectActiveByZoneID($segment->get('zone_id')),
        'areas' => $scope->daoFactory->get('gap\packing\pestControlInspectionExterior\Areas')->selectActiveByZoneID($segment->get('zone_id'))
      ];
    },
    'organization' => [
      'area_verifications',
      'corrective_actions',
      'equipment_status',
      'pest_types',
      'protection_status',
      'tasks',
      'areas'
    ],
  ],
  FALSE,
  TRUE
);

?>
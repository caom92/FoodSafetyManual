<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createAuthorizationReportService(
  'GAP',
  'Fields',
  'Pest Control Inspection Flytrap',
  [
    'items_name' => 'Areas',
    'extra_info' => [
      // NULL
    ],
    'function' => function($scope, $segment, $logDate) {
      $areas = [];

      $areas = $scope->daoFactory->get('gap\packing\pestControlInspectionFlytrap\Logs')->selectByCaptureDateID($logDate['id']);

      return [
        'area_verifications' => $scope->daoFactory->get('gap\packing\pestControlInspectionFlytrap\AreaVerification')->selectActiveByZoneID($segment->get('zone_id')),
        'corrective_actions' => $scope->daoFactory->get('gap\packing\pestControlInspectionFlytrap\CorrectiveActions')->selectActiveByZoneID($segment->get('zone_id')),
        'equipment_status' => $scope->daoFactory->get('gap\packing\pestControlInspectionFlytrap\EquipmentStatus')->selectActiveByZoneID($segment->get('zone_id')),
        'pest_types' => $scope->daoFactory->get('gap\packing\pestControlInspectionFlytrap\PestTypes')->selectActiveByZoneID($segment->get('zone_id')),
        'protection_status' => $scope->daoFactory->get('gap\packing\pestControlInspectionFlytrap\ProtectionStatus')->selectActiveByZoneID($segment->get('zone_id')),
        'tasks' => $scope->daoFactory->get('gap\packing\pestControlInspectionFlytrap\Tasks')->selectActiveByZoneID($segment->get('zone_id')),
        'areas' => $areas
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
    ]
  ],
  FALSE,
  TRUE
);

?>
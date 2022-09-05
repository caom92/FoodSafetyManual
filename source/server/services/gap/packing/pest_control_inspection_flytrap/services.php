<?php

$gapPestControlInspectionFlytrap = [
  'tables' => [
    'gap\packing\pestControlInspectionFlytrap\Areas' =>
      realpath(dirname(__FILE__).'/Areas.php'),
    'gap\packing\pestControlInspectionFlytrap\AreaVerification' =>
      realpath(dirname(__FILE__).'/AreaVerification.php'),
    'gap\packing\pestControlInspectionFlytrap\CorrectiveActions' =>
      realpath(dirname(__FILE__).'/CorrectiveActions.php'),
    'gap\packing\pestControlInspectionFlytrap\EquipmentStatus' =>
      realpath(dirname(__FILE__).'/EquipmentStatus.php'),
    'gap\packing\pestControlInspectionFlytrap\Logs' =>
      realpath(dirname(__FILE__).'/Logs.php'),
    'gap\packing\pestControlInspectionFlytrap\PestTypes' =>
      realpath(dirname(__FILE__).'/PestTypes.php'),
    'gap\packing\pestControlInspectionFlytrap\ProtectionStatus' =>
      realpath(dirname(__FILE__).'/ProtectionStatus.php'),
    'gap\packing\pestControlInspectionFlytrap\Tasks' =>
      realpath(dirname(__FILE__).'/Tasks.php')
  ],
  'services' => [
    // Main (Areas)
    'add-area-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/add-gap-packing-pest-control-inspection-flytrap.php'),
    'inventory-area-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/inventory-gap-packing-pest-control-inspection-flytrap.php'),
    'reorder-area-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/reorder-gap-packing-pest-control-inspection-flytrap.php'),
    'toggle-area-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/toggle-gap-packing-pest-control-inspection-flytrap.php'),
    // Area Verification
    'add-area-verification-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/add-area-verification-gap-packing-pest-control-inspection-flytrap.php'),
    'inventory-area-verification-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/inventory-area-verification-gap-packing-pest-control-inspection-flytrap.php'),
    'reorder-area-verification-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/reorder-area-verification-gap-packing-pest-control-inspection-flytrap.php'),
    'toggle-area-verification-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/toggle-area-verification-gap-packing-pest-control-inspection-flytrap.php'),
    // Corrective Actions
    'add-corrective-action-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/add-corrective-actions-gap-packing-pest-control-inspection-flytrap.php'),
    'inventory-corrective-action-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/inventory-corrective-actions-gap-packing-pest-control-inspection-flytrap.php'),
    'reorder-corrective-action-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/reorder-corrective-actions-gap-packing-pest-control-inspection-flytrap.php'),
    'toggle-corrective-action-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/toggle-corrective-actions-gap-packing-pest-control-inspection-flytrap.php'),
    // Equipment Status
    'add-equipment-status-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/add-equipment-status-gap-packing-pest-control-inspection-flytrap.php'),
    'inventory-equipment-status-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/inventory-equipment-status-gap-packing-pest-control-inspection-flytrap.php'),
    'reorder-equipment-status-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/reorder-equipment-status-gap-packing-pest-control-inspection-flytrap.php'),
    'toggle-equipment-status-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/toggle-equipment-status-gap-packing-pest-control-inspection-flytrap.php'),
    // Pest Types
    'add-pest-type-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/add-pest-types-gap-packing-pest-control-inspection-flytrap.php'),
    'inventory-pest-type-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/inventory-pest-types-gap-packing-pest-control-inspection-flytrap.php'),
    'reorder-pest-type-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/reorder-pest-types-gap-packing-pest-control-inspection-flytrap.php'),
    'toggle-pest-type-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/toggle-pest-types-gap-packing-pest-control-inspection-flytrap.php'),
    // Protection Status
    'add-protection-status-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/add-protection-status-gap-packing-pest-control-inspection-flytrap.php'),
    'inventory-protection-status-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/inventory-protection-status-gap-packing-pest-control-inspection-flytrap.php'),
    'reorder-protection-status-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/reorder-protection-status-gap-packing-pest-control-inspection-flytrap.php'),
    'toggle-protection-status-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/toggle-protection-status-gap-packing-pest-control-inspection-flytrap.php'),
    // Tasks
    'add-task-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/add-tasks-gap-packing-pest-control-inspection-flytrap.php'),
    'inventory-task-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/inventory-tasks-gap-packing-pest-control-inspection-flytrap.php'),
    'reorder-task-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/reorder-tasks-gap-packing-pest-control-inspection-flytrap.php'),
    'toggle-task-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/toggle-tasks-gap-packing-pest-control-inspection-flytrap.php'),
    'authorization-report-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/authorization-report-gap-packing-pest-control-inspection-flytrap.php'),
    'capture-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/capture-gap-packing-pest-control-inspection-flytrap.php'),
    'list-waiting-logs-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/list-waiting-logs-gap-packing-pest-control-inspection-flytrap.php'),
    'log-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/log-gap-packing-pest-control-inspection-flytrap.php'),
    'report-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/report-gap-packing-pest-control-inspection-flytrap.php'),
    'update-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/update-gap-packing-pest-control-inspection-flytrap.php'),
    'upload-manual-gap-packing-pest-control-inspection-flytrap' =>
      realpath(dirname(__FILE__).'/upload-manual-gap-packing-pest-control-inspection-flytrap.php')
  ]
];

?>
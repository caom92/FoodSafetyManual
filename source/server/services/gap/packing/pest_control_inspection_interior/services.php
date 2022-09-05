<?php

$gapPestControlInspectionInterior = [
  'tables' => [
    'gap\packing\pestControlInspectionInterior\Areas' =>
      realpath(dirname(__FILE__).'/Areas.php'),
    'gap\packing\pestControlInspectionInterior\AreaVerification' =>
      realpath(dirname(__FILE__).'/AreaVerification.php'),
    'gap\packing\pestControlInspectionInterior\CorrectiveActions' =>
      realpath(dirname(__FILE__).'/CorrectiveActions.php'),
    'gap\packing\pestControlInspectionInterior\EquipmentStatus' =>
      realpath(dirname(__FILE__).'/EquipmentStatus.php'),
    'gap\packing\pestControlInspectionInterior\Logs' =>
      realpath(dirname(__FILE__).'/Logs.php'),
    'gap\packing\pestControlInspectionInterior\PestTypes' =>
      realpath(dirname(__FILE__).'/PestTypes.php'),
    'gap\packing\pestControlInspectionInterior\ProtectionStatus' =>
      realpath(dirname(__FILE__).'/ProtectionStatus.php'),
    'gap\packing\pestControlInspectionInterior\Tasks' =>
      realpath(dirname(__FILE__).'/Tasks.php')
  ],
  'services' => [
    // Main (Areas)
    'add-area-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/add-gap-packing-pest-control-inspection-interior.php'),
    'inventory-area-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/inventory-gap-packing-pest-control-inspection-interior.php'),
    'reorder-area-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/reorder-gap-packing-pest-control-inspection-interior.php'),
    'toggle-area-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/toggle-gap-packing-pest-control-inspection-interior.php'),
    // Area Verification
    'add-area-verification-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/add-area-verification-gap-packing-pest-control-inspection-interior.php'),
    'inventory-area-verification-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/inventory-area-verification-gap-packing-pest-control-inspection-interior.php'),
    'reorder-area-verification-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/reorder-area-verification-gap-packing-pest-control-inspection-interior.php'),
    'toggle-area-verification-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/toggle-area-verification-gap-packing-pest-control-inspection-interior.php'),
    // Corrective Actions
    'add-corrective-action-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/add-corrective-actions-gap-packing-pest-control-inspection-interior.php'),
    'inventory-corrective-action-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/inventory-corrective-actions-gap-packing-pest-control-inspection-interior.php'),
    'reorder-corrective-action-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/reorder-corrective-actions-gap-packing-pest-control-inspection-interior.php'),
    'toggle-corrective-action-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/toggle-corrective-actions-gap-packing-pest-control-inspection-interior.php'),
    // Equipment Status
    'add-equipment-status-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/add-equipment-status-gap-packing-pest-control-inspection-interior.php'),
    'inventory-equipment-status-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/inventory-equipment-status-gap-packing-pest-control-inspection-interior.php'),
    'reorder-equipment-status-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/reorder-equipment-status-gap-packing-pest-control-inspection-interior.php'),
    'toggle-equipment-status-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/toggle-equipment-status-gap-packing-pest-control-inspection-interior.php'),
    // Pest Types
    'add-pest-type-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/add-pest-types-gap-packing-pest-control-inspection-interior.php'),
    'inventory-pest-type-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/inventory-pest-types-gap-packing-pest-control-inspection-interior.php'),
    'reorder-pest-type-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/reorder-pest-types-gap-packing-pest-control-inspection-interior.php'),
    'toggle-pest-type-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/toggle-pest-types-gap-packing-pest-control-inspection-interior.php'),
    // Protection Status
    'add-protection-status-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/add-protection-status-gap-packing-pest-control-inspection-interior.php'),
    'inventory-protection-status-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/inventory-protection-status-gap-packing-pest-control-inspection-interior.php'),
    'reorder-protection-status-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/reorder-protection-status-gap-packing-pest-control-inspection-interior.php'),
    'toggle-protection-status-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/toggle-protection-status-gap-packing-pest-control-inspection-interior.php'),
    // Tasks
    'add-task-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/add-tasks-gap-packing-pest-control-inspection-interior.php'),
    'inventory-task-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/inventory-tasks-gap-packing-pest-control-inspection-interior.php'),
    'reorder-task-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/reorder-tasks-gap-packing-pest-control-inspection-interior.php'),
    'toggle-task-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/toggle-tasks-gap-packing-pest-control-inspection-interior.php'),
    'authorization-report-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/authorization-report-gap-packing-pest-control-inspection-interior.php'),
    'capture-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/capture-gap-packing-pest-control-inspection-interior.php'),
    'list-waiting-logs-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/list-waiting-logs-gap-packing-pest-control-inspection-interior.php'),
    'log-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/log-gap-packing-pest-control-inspection-interior.php'),
    'report-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/report-gap-packing-pest-control-inspection-interior.php'),
    'update-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/update-gap-packing-pest-control-inspection-interior.php'),
    'upload-manual-gap-packing-pest-control-inspection-interior' =>
      realpath(dirname(__FILE__).'/upload-manual-gap-packing-pest-control-inspection-interior.php')
  ]
];

?>
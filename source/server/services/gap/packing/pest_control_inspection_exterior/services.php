<?php

$gapPestControlInspectionExterior = [
  'tables' => [
    'gap\packing\pestControlInspectionExterior\Areas' =>
      realpath(dirname(__FILE__).'/Areas.php'),
    'gap\packing\pestControlInspectionExterior\AreaVerification' =>
      realpath(dirname(__FILE__).'/AreaVerification.php'),
    'gap\packing\pestControlInspectionExterior\CorrectiveActions' =>
      realpath(dirname(__FILE__).'/CorrectiveActions.php'),
    'gap\packing\pestControlInspectionExterior\EquipmentStatus' =>
      realpath(dirname(__FILE__).'/EquipmentStatus.php'),
    'gap\packing\pestControlInspectionExterior\Logs' =>
      realpath(dirname(__FILE__).'/Logs.php'),
    'gap\packing\pestControlInspectionExterior\PestTypes' =>
      realpath(dirname(__FILE__).'/PestTypes.php'),
    'gap\packing\pestControlInspectionExterior\ProtectionStatus' =>
      realpath(dirname(__FILE__).'/ProtectionStatus.php'),
    'gap\packing\pestControlInspectionExterior\Tasks' =>
      realpath(dirname(__FILE__).'/Tasks.php')
  ],
  'services' => [
    // Main (Areas)
    'add-area-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/add-gap-packing-pest-control-inspection-exterior.php'),
    'inventory-area-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/inventory-gap-packing-pest-control-inspection-exterior.php'),
    'reorder-area-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/reorder-gap-packing-pest-control-inspection-exterior.php'),
    'toggle-area-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/toggle-gap-packing-pest-control-inspection-exterior.php'),
    // Area Verification
    'add-area-verification-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/add-area-verification-gap-packing-pest-control-inspection-exterior.php'),
    'inventory-area-verification-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/inventory-area-verification-gap-packing-pest-control-inspection-exterior.php'),
    'reorder-area-verification-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/reorder-area-verification-gap-packing-pest-control-inspection-exterior.php'),
    'toggle-area-verification-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/toggle-area-verification-gap-packing-pest-control-inspection-exterior.php'),
    // Corrective Actions
    'add-corrective-action-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/add-corrective-actions-gap-packing-pest-control-inspection-exterior.php'),
    'inventory-corrective-action-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/inventory-corrective-actions-gap-packing-pest-control-inspection-exterior.php'),
    'reorder-corrective-action-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/reorder-corrective-actions-gap-packing-pest-control-inspection-exterior.php'),
    'toggle-corrective-action-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/toggle-corrective-actions-gap-packing-pest-control-inspection-exterior.php'),
    // Equipment Status
    'add-equipment-status-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/add-equipment-status-gap-packing-pest-control-inspection-exterior.php'),
    'inventory-equipment-status-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/inventory-equipment-status-gap-packing-pest-control-inspection-exterior.php'),
    'reorder-equipment-status-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/reorder-equipment-status-gap-packing-pest-control-inspection-exterior.php'),
    'toggle-equipment-status-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/toggle-equipment-status-gap-packing-pest-control-inspection-exterior.php'),
    // Pest Types
    'add-pest-type-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/add-pest-types-gap-packing-pest-control-inspection-exterior.php'),
    'inventory-pest-type-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/inventory-pest-types-gap-packing-pest-control-inspection-exterior.php'),
    'reorder-pest-type-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/reorder-pest-types-gap-packing-pest-control-inspection-exterior.php'),
    'toggle-pest-type-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/toggle-pest-types-gap-packing-pest-control-inspection-exterior.php'),
    // Protection Status
    'add-protection-status-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/add-protection-status-gap-packing-pest-control-inspection-exterior.php'),
    'inventory-protection-status-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/inventory-protection-status-gap-packing-pest-control-inspection-exterior.php'),
    'reorder-protection-status-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/reorder-protection-status-gap-packing-pest-control-inspection-exterior.php'),
    'toggle-protection-status-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/toggle-protection-status-gap-packing-pest-control-inspection-exterior.php'),
    // Tasks
    'add-task-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/add-tasks-gap-packing-pest-control-inspection-exterior.php'),
    'inventory-task-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/inventory-tasks-gap-packing-pest-control-inspection-exterior.php'),
    'reorder-task-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/reorder-tasks-gap-packing-pest-control-inspection-exterior.php'),
    'toggle-task-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/toggle-tasks-gap-packing-pest-control-inspection-exterior.php'),
    'authorization-report-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/authorization-report-gap-packing-pest-control-inspection-exterior.php'),
    'capture-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/capture-gap-packing-pest-control-inspection-exterior.php'),
    'list-waiting-logs-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/list-waiting-logs-gap-packing-pest-control-inspection-exterior.php'),
    'log-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/log-gap-packing-pest-control-inspection-exterior.php'),
    'report-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/report-gap-packing-pest-control-inspection-exterior.php'),
    'update-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/update-gap-packing-pest-control-inspection-exterior.php'),
    'upload-manual-gap-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/upload-manual-gap-packing-pest-control-inspection-exterior.php')
  ]
];

?>
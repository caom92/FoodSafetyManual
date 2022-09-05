<?php

$gmpPestControlInspectionExterior = [
  'tables' => [
    'gmp\packing\pestControlInspectionExterior\Areas' =>
      realpath(dirname(__FILE__).'/Areas.php'),
    'gmp\packing\pestControlInspectionExterior\AreaVerification' =>
      realpath(dirname(__FILE__).'/AreaVerification.php'),
    'gmp\packing\pestControlInspectionExterior\CorrectiveActions' =>
      realpath(dirname(__FILE__).'/CorrectiveActions.php'),
    'gmp\packing\pestControlInspectionExterior\EquipmentStatus' =>
      realpath(dirname(__FILE__).'/EquipmentStatus.php'),
    'gmp\packing\pestControlInspectionExterior\Logs' =>
      realpath(dirname(__FILE__).'/Logs.php'),
    'gmp\packing\pestControlInspectionExterior\PestTypes' =>
      realpath(dirname(__FILE__).'/PestTypes.php'),
    'gmp\packing\pestControlInspectionExterior\ProtectionStatus' =>
      realpath(dirname(__FILE__).'/ProtectionStatus.php'),
    'gmp\packing\pestControlInspectionExterior\Tasks' =>
      realpath(dirname(__FILE__).'/Tasks.php')
  ],
  'services' => [
    // Main (Areas)
    'add-area-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/add-gmp-packing-pest-control-inspection-exterior.php'),
    'inventory-area-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/inventory-gmp-packing-pest-control-inspection-exterior.php'),
    'reorder-area-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/reorder-gmp-packing-pest-control-inspection-exterior.php'),
    'toggle-area-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/toggle-gmp-packing-pest-control-inspection-exterior.php'),
    // Area Verification
    'add-area-verification-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/add-area-verification-gmp-packing-pest-control-inspection-exterior.php'),
    'inventory-area-verification-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/inventory-area-verification-gmp-packing-pest-control-inspection-exterior.php'),
    'reorder-area-verification-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/reorder-area-verification-gmp-packing-pest-control-inspection-exterior.php'),
    'toggle-area-verification-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/toggle-area-verification-gmp-packing-pest-control-inspection-exterior.php'),
    // Corrective Actions
    'add-corrective-action-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/add-corrective-actions-gmp-packing-pest-control-inspection-exterior.php'),
    'inventory-corrective-action-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/inventory-corrective-actions-gmp-packing-pest-control-inspection-exterior.php'),
    'reorder-corrective-action-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/reorder-corrective-actions-gmp-packing-pest-control-inspection-exterior.php'),
    'toggle-corrective-action-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/toggle-corrective-actions-gmp-packing-pest-control-inspection-exterior.php'),
    // Equipment Status
    'add-equipment-status-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/add-equipment-status-gmp-packing-pest-control-inspection-exterior.php'),
    'inventory-equipment-status-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/inventory-equipment-status-gmp-packing-pest-control-inspection-exterior.php'),
    'reorder-equipment-status-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/reorder-equipment-status-gmp-packing-pest-control-inspection-exterior.php'),
    'toggle-equipment-status-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/toggle-equipment-status-gmp-packing-pest-control-inspection-exterior.php'),
    // Pest Types
    'add-pest-type-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/add-pest-types-gmp-packing-pest-control-inspection-exterior.php'),
    'inventory-pest-type-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/inventory-pest-types-gmp-packing-pest-control-inspection-exterior.php'),
    'reorder-pest-type-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/reorder-pest-types-gmp-packing-pest-control-inspection-exterior.php'),
    'toggle-pest-type-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/toggle-pest-types-gmp-packing-pest-control-inspection-exterior.php'),
    // Protection Status
    'add-protection-status-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/add-protection-status-gmp-packing-pest-control-inspection-exterior.php'),
    'inventory-protection-status-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/inventory-protection-status-gmp-packing-pest-control-inspection-exterior.php'),
    'reorder-protection-status-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/reorder-protection-status-gmp-packing-pest-control-inspection-exterior.php'),
    'toggle-protection-status-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/toggle-protection-status-gmp-packing-pest-control-inspection-exterior.php'),
    // Tasks
    'add-task-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/add-tasks-gmp-packing-pest-control-inspection-exterior.php'),
    'inventory-task-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/inventory-tasks-gmp-packing-pest-control-inspection-exterior.php'),
    'reorder-task-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/reorder-tasks-gmp-packing-pest-control-inspection-exterior.php'),
    'toggle-task-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/toggle-tasks-gmp-packing-pest-control-inspection-exterior.php'),
    'authorization-report-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/authorization-report-gmp-packing-pest-control-inspection-exterior.php'),
    'capture-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/capture-gmp-packing-pest-control-inspection-exterior.php'),
    'list-waiting-logs-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/list-waiting-logs-gmp-packing-pest-control-inspection-exterior.php'),
    'log-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/log-gmp-packing-pest-control-inspection-exterior.php'),
    'report-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/report-gmp-packing-pest-control-inspection-exterior.php'),
    'update-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/update-gmp-packing-pest-control-inspection-exterior.php'),
    'upload-manual-gmp-packing-pest-control-inspection-exterior' =>
      realpath(dirname(__FILE__).'/upload-manual-gmp-packing-pest-control-inspection-exterior.php')
  ]
];

?>
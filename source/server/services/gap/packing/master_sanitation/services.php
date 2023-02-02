<?php

$gapMasterSanitation = [
  'tables' => [
    'gap\packing\masterSanitation\Areas' =>
      realpath(dirname(__FILE__).'/tables/Areas.php'),
    'gap\packing\masterSanitation\Types' =>
      realpath(dirname(__FILE__).'/tables/Types.php'),
    'gap\packing\masterSanitation\Checks' =>
      realpath(dirname(__FILE__).'/tables/Checks.php'),
    'gap\packing\masterSanitation\Logs' =>
      realpath(dirname(__FILE__).'/tables/Logs.php')
  ],
  'services' => [
    // Areas
    'add-area-gap-packing-master-sanitation' =>
      realpath(dirname(__FILE__).'/inventory/areas/add-area-gap-packing-master-sanitation.php'),
    'get-areas-of-zone-gap-packing-master-sanitation' =>
      realpath(dirname(__FILE__).'/inventory/areas/get-areas-of-zone-gap-packing-master-sanitation.php'),
    'inventory-area-gap-packing-master-sanitation' =>
      realpath(dirname(__FILE__).'/inventory/areas/inventory-area-gap-packing-master-sanitation.php'),
    'reorder-area-gap-packing-master-sanitation' =>
      realpath(dirname(__FILE__).'/inventory/areas/reorder-area-gap-packing-master-sanitation.php'),
    'toggle-area-gap-packing-master-sanitation' =>
      realpath(dirname(__FILE__).'/inventory/areas/toggle-area-gap-packing-master-sanitation.php'),
    // Types
    'add-type-gap-packing-master-sanitation' =>
      realpath(dirname(__FILE__).'/inventory/types/add-type-gap-packing-master-sanitation.php'),
    'inventory-type-gap-packing-master-sanitation' =>
      realpath(dirname(__FILE__).'/inventory/types/inventory-type-gap-packing-master-sanitation.php'),
    'reorder-type-gap-packing-master-sanitation' =>
      realpath(dirname(__FILE__).'/inventory/types/reorder-type-gap-packing-master-sanitation.php'),
    'toggle-type-gap-packing-master-sanitation' =>
      realpath(dirname(__FILE__).'/inventory/types/toggle-type-gap-packing-master-sanitation.php'),
    // Checks
    'add-check-gap-packing-master-sanitation' =>
      realpath(dirname(__FILE__).'/inventory/checks/add-check-gap-packing-master-sanitation.php'),
    'inventory-check-gap-packing-master-sanitation' =>
      realpath(dirname(__FILE__).'/inventory/checks/inventory-check-gap-packing-master-sanitation.php'),
    'reorder-check-gap-packing-master-sanitation' =>
      realpath(dirname(__FILE__).'/inventory/checks/reorder-check-gap-packing-master-sanitation.php'),
    'toggle-check-gap-packing-master-sanitation' =>
      realpath(dirname(__FILE__).'/inventory/checks/toggle-check-gap-packing-master-sanitation.php'),
    // Lifecycle
    'authorization-report-gap-packing-master-sanitation' =>
      realpath(dirname(__FILE__).'/log/authorization-report-gap-packing-master-sanitation.php'),
    'capture-gap-packing-master-sanitation' =>
      realpath(dirname(__FILE__).'/log/capture-gap-packing-master-sanitation.php'),
    'list-waiting-logs-gap-packing-master-sanitation' =>
      realpath(dirname(__FILE__).'/log/list-waiting-logs-gap-packing-master-sanitation.php'),
    'log-gap-packing-master-sanitation' =>
      realpath(dirname(__FILE__).'/log/log-gap-packing-master-sanitation.php'),
    'report-gap-packing-master-sanitation' =>
      realpath(dirname(__FILE__).'/log/report-gap-packing-master-sanitation.php'),
    'update-gap-packing-master-sanitation' =>
      realpath(dirname(__FILE__).'/log/update-gap-packing-master-sanitation.php'),
    'upload-manual-gap-packing-master-sanitation' =>
      realpath(dirname(__FILE__).'/log/upload-manual-gap-packing-master-sanitation.php')
  ]
];

?>

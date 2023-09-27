<?php

$gapCoolerCleaning = [
  'tables' => [
    'gap\packing\coolerCleaning\Areas' =>
      realpath(dirname(__FILE__).'/tables/Areas.php'),
    'gap\packing\coolerCleaning\Types' =>
      realpath(dirname(__FILE__).'/tables/Types.php'),
    'gap\packing\coolerCleaning\Checks' =>
      realpath(dirname(__FILE__).'/tables/Checks.php'),
    'gap\packing\coolerCleaning\AreasLogs' =>
      realpath(dirname(__FILE__).'/tables/AreasLogs.php'),
    'gap\packing\coolerCleaning\ChecksLogs' =>
      realpath(dirname(__FILE__).'/tables/ChecksLogs.php')
  ],
  'services' => [
    // Areas
    'add-area-gap-packing-cooler-cleaning' =>
      realpath(dirname(__FILE__).'/inventory/areas/add-area-gap-packing-cooler-cleaning.php'),
    'get-areas-of-zone-gap-packing-cooler-cleaning' =>
      realpath(dirname(__FILE__).'/inventory/areas/get-areas-of-zone-gap-packing-cooler-cleaning.php'),
    'inventory-area-gap-packing-cooler-cleaning' =>
      realpath(dirname(__FILE__).'/inventory/areas/inventory-area-gap-packing-cooler-cleaning.php'),
    'reorder-area-gap-packing-cooler-cleaning' =>
      realpath(dirname(__FILE__).'/inventory/areas/reorder-area-gap-packing-cooler-cleaning.php'),
    'toggle-area-gap-packing-cooler-cleaning' =>
      realpath(dirname(__FILE__).'/inventory/areas/toggle-area-gap-packing-cooler-cleaning.php'),
    // Types
    'add-type-gap-packing-cooler-cleaning' =>
      realpath(dirname(__FILE__).'/inventory/types/add-type-gap-packing-cooler-cleaning.php'),
    'inventory-type-gap-packing-cooler-cleaning' =>
      realpath(dirname(__FILE__).'/inventory/types/inventory-type-gap-packing-cooler-cleaning.php'),
    'reorder-type-gap-packing-cooler-cleaning' =>
      realpath(dirname(__FILE__).'/inventory/types/reorder-type-gap-packing-cooler-cleaning.php'),
    'toggle-type-gap-packing-cooler-cleaning' =>
      realpath(dirname(__FILE__).'/inventory/types/toggle-type-gap-packing-cooler-cleaning.php'),
    // Checks
    'add-check-gap-packing-cooler-cleaning' =>
      realpath(dirname(__FILE__).'/inventory/checks/add-check-gap-packing-cooler-cleaning.php'),
    'inventory-check-gap-packing-cooler-cleaning' =>
      realpath(dirname(__FILE__).'/inventory/checks/inventory-check-gap-packing-cooler-cleaning.php'),
    'reorder-check-gap-packing-cooler-cleaning' =>
      realpath(dirname(__FILE__).'/inventory/checks/reorder-check-gap-packing-cooler-cleaning.php'),
    'toggle-check-gap-packing-cooler-cleaning' =>
      realpath(dirname(__FILE__).'/inventory/checks/toggle-check-gap-packing-cooler-cleaning.php'),
    // Lifecycle
    'authorization-report-gap-packing-cooler-cleaning' =>
      realpath(dirname(__FILE__).'/log/authorization-report-gap-packing-cooler-cleaning.php'),
    'capture-gap-packing-cooler-cleaning' =>
      realpath(dirname(__FILE__).'/log/capture-gap-packing-cooler-cleaning.php'),
    'list-waiting-logs-gap-packing-cooler-cleaning' =>
      realpath(dirname(__FILE__).'/log/list-waiting-logs-gap-packing-cooler-cleaning.php'),
    'log-gap-packing-cooler-cleaning' =>
      realpath(dirname(__FILE__).'/log/log-gap-packing-cooler-cleaning.php'),
    'report-gap-packing-cooler-cleaning' =>
      realpath(dirname(__FILE__).'/log/report-gap-packing-cooler-cleaning.php'),
    'update-gap-packing-cooler-cleaning' =>
      realpath(dirname(__FILE__).'/log/update-gap-packing-cooler-cleaning.php'),
    'upload-manual-gap-packing-cooler-cleaning' =>
      realpath(dirname(__FILE__).'/log/upload-manual-gap-packing-cooler-cleaning.php')
  ]
];

?>

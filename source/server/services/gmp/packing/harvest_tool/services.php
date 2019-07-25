<?php

$gmpHarvestTool = [
  'tables' => [
    'gmp\packing\harvestTool\DateLogs' =>
      realpath(dirname(__FILE__).'/DateLogs.php'),
    'gmp\packing\harvestTool\ToolLogs' =>
      realpath(dirname(__FILE__).'/ToolLogs.php'),
    'gmp\packing\harvestTool\Tools' =>
      realpath(dirname(__FILE__).'/Tools.php')
  ],
  'services' => [
    'add-gmp-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/add-gmp-packing-harvest-tool.php'),
    'authorization-report-gmp-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/authorization-report-gmp-packing-harvest-tool.php'),
    'capture-gmp-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/capture-gmp-packing-harvest-tool.php'),
    'inventory-gmp-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/inventory-gmp-packing-harvest-tool.php'),
    'list-waiting-logs-gmp-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/list-waiting-logs-gmp-packing-harvest-tool.php'),
    'log-gmp-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/log-gmp-packing-harvest-tool.php'),
    'reorder-gmp-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/reorder-gmp-packing-harvest-tool.php'),
    'report-gmp-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/report-gmp-packing-harvest-tool.php'),
    'toggle-gmp-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/toggle-gmp-packing-harvest-tool.php'),
    'update-gmp-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/update-gmp-packing-harvest-tool.php'),
    'upload-manual-gmp-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/upload-manual-gmp-packing-harvest-tool.php')
  ]
];

?>
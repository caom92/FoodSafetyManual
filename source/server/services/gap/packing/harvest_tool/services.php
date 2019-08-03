<?php

$gapHarvestTool = [
  'tables' => [
    'gap\packing\harvestTool\DateLogs' =>
      realpath(dirname(__FILE__).'/DateLogs.php'),
    'gap\packing\harvestTool\ToolLogs' =>
      realpath(dirname(__FILE__).'/ToolLogs.php'),
    'gap\packing\harvestTool\Tools' =>
      realpath(dirname(__FILE__).'/Tools.php')
  ],
  'services' => [
    'add-gap-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/add-gap-packing-harvest-tool.php'),
    'authorization-report-gap-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/authorization-report-gap-packing-harvest-tool.php'),
    'capture-gap-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/capture-gap-packing-harvest-tool.php'),
    'inventory-gap-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/inventory-gap-packing-harvest-tool.php'),
    'list-waiting-logs-gap-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/list-waiting-logs-gap-packing-harvest-tool.php'),
    'log-gap-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/log-gap-packing-harvest-tool.php'),
    'reorder-gap-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/reorder-gap-packing-harvest-tool.php'),
    'report-gap-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/report-gap-packing-harvest-tool.php'),
    'toggle-gap-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/toggle-gap-packing-harvest-tool.php'),
    'update-gap-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/update-gap-packing-harvest-tool.php'),
    'upload-manual-gap-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/upload-manual-gap-packing-harvest-tool.php')
  ]
];

?>
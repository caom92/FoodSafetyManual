<?php

$gmpHarvestTool = [
  'tables' => [
    'gmp\packing\harvestTool\DateLogs' =>
      realpath(dirname(__FILE__).'/DateLogs.php'),
    'gmp\packing\harvestTool\TypeLogs' =>
      realpath(dirname(__FILE__).'/TypeLogs.php'),
    'gmp\packing\harvestTool\Types' =>
      realpath(dirname(__FILE__).'/Types.php')
  ],
  'services' => [
    'authorization-report-gmp-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/authorization-report-gmp-packing-harvest-tool.php'),
    'capture-gmp-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/capture-gmp-packing-harvest-tool.php'),
    'list-waiting-logs-gmp-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/list-waiting-logs-gmp-packing-harvest-tool.php'),
    'log-gmp-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/log-gmp-packing-harvest-tool.php'),
    'report-gmp-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/report-gmp-packing-harvest-tool.php'),
    'update-gmp-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/update-gmp-packing-harvest-tool.php'),
    'upload-manual-gmp-packing-harvest-tool' =>
      realpath(dirname(__FILE__).'/upload-manual-gmp-packing-harvest-tool.php')
  ]
];

?>
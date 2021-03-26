<?php

$harvestMachineCleaning = [
  'tables' => [
    'gap\packing\harvestMachineCleaning\Logs' =>
      realpath(dirname(__FILE__).'/Logs.php')
  ],
  'services' => [
    'authorization-report-gap-packing-harvest-machine-cleaning' =>
      realpath(dirname(__FILE__).'/authorization-report-gap-packing-harvest-machine-cleaning.php'),
    'capture-gap-packing-harvest-machine-cleaning' =>
      realpath(dirname(__FILE__).'/capture-gap-packing-harvest-machine-cleaning.php'),
    'list-waiting-logs-gap-packing-harvest-machine-cleaning' =>
      realpath(dirname(__FILE__).'/list-waiting-logs-gap-packing-harvest-machine-cleaning.php'),
    'log-gap-packing-harvest-machine-cleaning' =>
      realpath(dirname(__FILE__).'/log-gap-packing-harvest-machine-cleaning.php'),
    'report-gap-packing-harvest-machine-cleaning' =>
      realpath(dirname(__FILE__).'/report-gap-packing-harvest-machine-cleaning.php'),
    'update-gap-packing-harvest-machine-cleaning' =>
      realpath(dirname(__FILE__).'/update-gap-packing-harvest-machine-cleaning.php'),
    'upload-manual-gap-packing-harvest-machine-cleaning' =>
      realpath(dirname(__FILE__).'/upload-manual-gap-packing-harvest-machine-cleaning.php')
  ]
];

?>
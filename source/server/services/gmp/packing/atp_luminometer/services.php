<?php

$atpLuminometer = [
  'tables' => [
    'gmp\packing\atpLuminometer\Items' =>
      realpath(dirname(__FILE__).'/Items.php'),
    'gmp\packing\atpLuminometer\Types' =>
      realpath(dirname(__FILE__).'/Types.php'),
    'gmp\packing\atpLuminometer\ItemLogs' =>
      realpath(dirname(__FILE__).'/ItemLogs.php'),
    'gmp\packing\atpLuminometer\WeekLogs' =>
      realpath(dirname(__FILE__).'/WeekLogs.php'),
    'gmp\packing\atpLuminometer\TestLogs' =>
      realpath(dirname(__FILE__).'/TestLogs.php')
  ],
  'services' => [
    'upload-manual-gmp-packing-atp-luminometer' =>
      realpath(dirname(__FILE__).'/upload-manual-gmp-packing-atp-luminometer.php'),
    'list-waiting-logs-gmp-packing-atp-luminometer' =>
      realpath(dirname(__FILE__).'/list-waiting-logs-gmp-packing-atp-luminometer.php'),
    'log-gmp-packing-atp-luminometer' =>
      realpath(dirname(__FILE__).'/log-gmp-packing-atp-luminometer.php'),
    'add-gmp-packing-atp-luminometer' =>
      realpath(dirname(__FILE__).'/add-gmp-packing-atp-luminometer.php'),
    'inventory-gmp-packing-atp-luminometer' =>
      realpath(dirname(__FILE__).'/inventory-gmp-packing-atp-luminometer.php'),
    'reorder-gmp-packing-atp-luminometer' =>
      realpath(dirname(__FILE__).'/reorder-gmp-packing-atp-luminometer.php'),
    'capture-gmp-packing-atp-luminometer' =>
      realpath(dirname(__FILE__).'/capture-gmp-packing-atp-luminometer.php'),
    'report-gmp-packing-atp-luminometer' =>
      realpath(dirname(__FILE__).'/report-gmp-packing-atp-luminometer.php'),
    'update-gmp-packing-atp-luminometer' =>
      realpath(dirname(__FILE__).'/update-gmp-packing-atp-luminometer.php'),
    'authorization-report-gmp-packing-atp-luminometer' =>
      realpath(dirname(__FILE__).'/authorization-report-gmp-packing-atp-luminometer.php')
  ]
];

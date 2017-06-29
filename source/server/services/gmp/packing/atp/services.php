<?php

$atp = [
  'tables' => [
    'gmp\packing\atp\Logs' =>
      realpath(dirname(__FILE__).'/Logs.php'),
    'gmp\packing\atp\TimeLogs' =>
      realpath(dirname(__FILE__).'/TimeLogs.php')
  ],
  'services' => [
    'upload-manual-gmp-packing-atp-testing' =>
      realpath(dirname(__FILE__).'/upload-manual-gmp-packing-atp-testing.php'),
    'log-gmp-packing-atp-testing' =>
      realpath(dirname(__FILE__).'/log-gmp-packing-atp-testing.php'),
    'capture-gmp-packing-atp-testing' =>
      realpath(dirname(__FILE__).'/capture-gmp-packing-atp-testing.php'),
    'report-gmp-packing-atp-testing' =>
      realpath(dirname(__FILE__).'/report-gmp-packing-atp-testing.php'),
    'update-gmp-packing-atp-testing' =>
      realpath(dirname(__FILE__).'/update-gmp-packing-atp-testing.php'),
    'authorization-report-gmp-packing-atp-testing' =>
      realpath(dirname(__FILE__).'/authorization-report-gmp-packing-atp-testing.php')
  ]
];

?>
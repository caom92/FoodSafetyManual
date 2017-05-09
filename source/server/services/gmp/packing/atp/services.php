<?php

$atp = [
  'tables' => [
    'gmp\packing\atp\Logs' =>
      realpath(dirname(__FILE__).'/Logs.php'),
    'gmp\packing\atp\TimeLogs' =>
      realpath(dirname(__FILE__).'/TimeLogs.php'),
  ],
  'services' => [
    'upload-manual-gmp-packing-atp-testing' =>
      realpath(dirname(__FILE__).'/upload-manual-atp-testing.php'),
    'log-gmp-packing-atp-testing' =>
      realpath(dirname(__FILE__).'/log-atp-testing.php'),
    'capture-gmp-packing-atp-testing' =>
      realpath(dirname(__FILE__).'/capture-atp-testing.php'),
    'report-gmp-packing-atp-testing' =>
      realpath(dirname(__FILE__).'/report-atp-testing.php'),
  ]
];

?>
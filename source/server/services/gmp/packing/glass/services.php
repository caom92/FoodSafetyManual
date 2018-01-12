<?php

$glass = [
  'tables' => [
    'gmp\packing\glass\Logs' =>
      realpath(dirname(__FILE__).'/Logs.php'),
    'gmp\packing\glass\AreaGlass' =>
      realpath(dirname(__FILE__).'/AreaGlass.php'),
  ],
  'services' => [
    'upload-manual-gmp-packing-glass-brittle' =>
      realpath(dirname(__FILE__).'/upload-manual-gmp-packing-glass-brittle.php'),
    'log-gmp-packing-glass-brittle' =>
      realpath(dirname(__FILE__).'/log-gmp-packing-glass-brittle.php'),
    'capture-gmp-packing-glass-brittle' =>
      realpath(dirname(__FILE__).'/capture-gmp-packing-glass-brittle.php'),
    'report-gmp-packing-glass-brittle' =>
      realpath(dirname(__FILE__).'/report-gmp-packing-glass-brittle.php'),
    'inventory-gmp-packing-glass-brittle' =>
      realpath(dirname(__FILE__).'/inventory-gmp-packing-glass-brittle.php'),
    'add-gmp-packing-glass-brittle' =>
      realpath(dirname(__FILE__).'/add-gmp-packing-glass-brittle.php'),
    'toggle-gmp-packing-glass-brittle' =>
      realpath(dirname(__FILE__).'/toggle-gmp-packing-glass-brittle.php'),
    'reorder-gmp-packing-glass-brittle' =>
      realpath(dirname(__FILE__).'/reorder-gmp-packing-glass-brittle.php'),
    'update-gmp-packing-glass-brittle' =>
      realpath(dirname(__FILE__).'/update-gmp-packing-glass-brittle.php'),
    'authorization-report-gmp-packing-glass-brittle' =>
      realpath(dirname(__FILE__)
      .'/authorization-report-gmp-packing-glass-brittle.php'),
    'get-areas-of-zone-gmp-packing-glass-brittle' => 
      realpath(__DIR__.'/../preop/get-areas-gmp-packing-preop.php'),
    'get-areas-of-zone-gmp-packing-glass-brittle' => 
      realpath(__DIR__.'/../preop/get-areas-gmp-packing-preop.php'),
    'add-workplace-area-gmp-packing-glass-brittle' => 
      realpath(__DIR__.'/../preop/get-areas-gmp-packing-preop.php')
  ]
];

?>
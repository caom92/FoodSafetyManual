<?php

$ozoneWater = [
  'tables' => [
    'gmp\packing\ozone\Machines' =>
      realpath(dirname(__FILE__).'/Machines.php'),
    'gmp\packing\ozone\Logs' =>
      realpath(dirname(__FILE__).'/Logs.php'),
  ],
  'services' => [
    'upload-manual-gmp-packing-ozone-water' =>
      realpath(dirname(__FILE__).'/upload-manual-gmp-packing-ozone-water.php'),
    'log-gmp-packing-ozone-water' =>
      realpath(dirname(__FILE__).'/log-gmp-packing-ozone-water.php'),
    'capture-gmp-packing-ozone-water' =>
      realpath(dirname(__FILE__).'/capture-gmp-packing-ozone-water.php'),
    'report-gmp-packing-ozone-water' =>
      realpath(dirname(__FILE__).'/report-gmp-packing-ozone-water.php'),
    'inventory-gmp-packing-ozone-water' =>
      realpath(dirname(__FILE__).'/inventory-gmp-packing-ozone-water.php'),
    'add-gmp-packing-ozone-water' =>
      realpath(dirname(__FILE__).'/add-gmp-packing-ozone-water.php'),
    'toggle-gmp-packing-ozone-water' =>
      realpath(dirname(__FILE__).'/toggle-gmp-packing-ozone-water.php'),
    'reorder-gmp-packing-ozone-water' =>
      realpath(dirname(__FILE__).'/reorder-gmp-packing-ozone-water.php'),
    'update-gmp-packing-ozone-water' =>
      realpath(dirname(__FILE__).'/update-gmp-packing-ozone-water.php'),
    'authorization-report-gmp-packing-ozone-water' =>
      realpath(dirname(__FILE__).'/authorization-report-gmp-packing-ozone-water.php'),
  ]
];

?>
<?php

$finishedProduct = [
  'tables' => [
    'gmp\packing\finishedProduct\Logs' =>
      realpath(dirname(__FILE__).'/Logs.php'),
    'gmp\packing\finishedProduct\ProductionAreas' =>
      realpath(dirname(__FILE__).'/ProductionAreas.php'),
  ],
  'services' => [
    'upload-manual-gmp-packing-scale-finished-product' =>
      realpath(dirname(__FILE__).'/upload-manual-gmp-packing-scale-finished-product.php'),
    'log-gmp-packing-scale-finished-product' =>
      realpath(dirname(__FILE__).'/log-gmp-packing-scale-finished-product.php'),
    'capture-gmp-packing-scale-finished-product' =>
      realpath(dirname(__FILE__).'/capture-gmp-packing-scale-finished-product.php'),
    'report-gmp-packing-scale-finished-product' =>
      realpath(dirname(__FILE__).'/report-gmp-packing-scale-finished-product.php'),
    'inventory-gmp-packing-scale-finished-product' =>
      realpath(dirname(__FILE__).'/inventory-gmp-packing-scale-finished-product.php'),
    'add-gmp-packing-scale-finished-product' =>
      realpath(dirname(__FILE__).'/add-gmp-packing-scale-finished-product.php'),
  ]
];

?>
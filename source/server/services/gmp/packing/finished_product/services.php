<?php

$finishedProduct = [
  'tables' => [
    'gmp\packing\finishedProduct\Logs' =>
      realpath(dirname(__FILE__).'/Logs.php'),
    'gmp\packing\finishedProduct\ProductionAreas' =>
      realpath(dirname(__FILE__).'/ProductionAreas.php'),
  ],
  'services' => [
    'upload-manual-gmp-packing-finished-product' =>
      realpath(dirname(__FILE__).'/upload-manual-gmp-packing-finished-product.php'),
    'log-gmp-packing-finished-product' =>
      realpath(dirname(__FILE__).'/log-gmp-packing-finished-product.php'),
    'capture-gmp-packing-finished-product' =>
      realpath(dirname(__FILE__).'/capture-gmp-packing-finished-product.php'),
    'report-gmp-packing-finished-product' =>
      realpath(dirname(__FILE__).'/report-gmp-packing-finished-product.php'),
    'inventory-gmp-packing-finished-product' =>
      realpath(dirname(__FILE__).'/inventory-gmp-packing-finished-product.php'),
    'add-gmp-packing-finished-product' =>
      realpath(dirname(__FILE__).'/add-gmp-packing-finished-product.php'),
    'update-gmp-packing-finished-product' =>
      realpath(dirname(__FILE__).'/update-gmp-packing-finished-product.php'),
  ]
];

?>
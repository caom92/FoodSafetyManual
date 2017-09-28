<?php

$agedProduct = [
  'tables' => [
    'gmp\packing\agedProduct\Logs' =>
      realpath(dirname(__FILE__).'/Logs.php')
  ],
  'services' => [
    'upload-manual-gmp-packing-aged-product' =>
      realpath(dirname(__FILE__).'/upload-manual-gmp-packing-aged-product.php'),
    'capture-gmp-packing-aged-product' =>
      realpath(dirname(__FILE__).'/capture-gmp-packing-aged-product.php'),
    'report-gmp-packing-aged-product' =>
      realpath(dirname(__FILE__).'/report-gmp-packing-aged-product.php'),
    'update-gmp-packing-aged-product' =>
      realpath(dirname(__FILE__).'/update-gmp-packing-aged-product.php'),
    'authorization-report-gmp-packing-aged-product' =>
      realpath(dirname(__FILE__).'/authorization-report-gmp-packing-aged-product.php')
  ]
];

?>
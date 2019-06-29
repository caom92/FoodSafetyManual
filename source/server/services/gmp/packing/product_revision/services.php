<?php

$productRevision = [
  'tables' => [
    'gmp\packing\productRevision\Logs' =>
      realpath(dirname(__FILE__).'/Logs.php'),
    'gmp\packing\productRevision\QualityTypes' =>
      realpath(dirname(__FILE__).'/QualityTypes.php'),
  ],
  'services' => [
    'authorization-report-gmp-packing-product-revision' =>
      realpath(dirname(__FILE__).'/authorization-report-gmp-packing-product-revision.php'),
    'capture-gmp-packing-product-revision' =>
      realpath(dirname(__FILE__).'/capture-gmp-packing-product-revision.php'),
    'log-gmp-packing-product-revision' =>
      realpath(dirname(__FILE__).'/log-gmp-packing-product-revision.php'),
    'report-gmp-packing-product-revision' =>
      realpath(dirname(__FILE__).'/report-gmp-packing-product-revision.php'),
    'update-gmp-packing-product-revision' =>
      realpath(dirname(__FILE__).'/update-gmp-packing-product-revision.php'),
    'upload-manual-gmp-packing-product-revision' =>
      realpath(dirname(__FILE__).'/upload-manual-gmp-packing-product-revision.php')
  ]
];

?>
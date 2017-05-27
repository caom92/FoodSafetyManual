<?php

$calibration = [
  'tables' => [
    'gmp\packing\calibration\ScaleLogs' =>
      realpath(dirname(__FILE__).'/ScaleLogs.php'),
    'gmp\packing\calibration\Scales' =>
      realpath(dirname(__FILE__).'/Scales.php'),
    'gmp\packing\calibration\ScaleTypes' =>
      realpath(dirname(__FILE__).'/ScaleTypes.php'),
    'gmp\packing\calibration\TimeLogs' =>
      realpath(dirname(__FILE__).'/TimeLogs.php'),
  ],
  'services' => [
    'upload-manual-gmp-packing-scale-calibration' =>
      realpath(dirname(__FILE__).'/upload-manual-gmp-packing-scale-calibration.php'),
    'log-gmp-packing-scale-calibration' =>
      realpath(dirname(__FILE__).'/log-gmp-packing-scale-calibration.php'),
    'capture-gmp-packing-scale-calibration' =>
      realpath(dirname(__FILE__).'/capture-gmp-packing-scale-calibration.php'),
    'report-gmp-packing-scale-calibration' =>
      realpath(dirname(__FILE__).'/report-gmp-packing-scale-calibration.php'),
    'inventory-gmp-packing-scale-calibration' =>
      realpath(dirname(__FILE__).'/inventory-gmp-packing-scale-calibration.php'),
    'add-gmp-packing-scale-calibration' =>
      realpath(dirname(__FILE__).'/add-gmp-packing-scale-calibration.php'),
    'toggle-gmp-packing-scale-calibration' =>
      realpath(dirname(__FILE__).'/toggle-gmp-packing-scale-calibration.php'),
    'reorder-gmp-packing-scale-calibration' =>
      realpath(dirname(__FILE__).'/reorder-gmp-packing-scale-calibration.php'),
    'update-gmp-packing-scale-calibration' =>
      realpath(dirname(__FILE__).'/update-gmp-packing-scale-calibration.php'),
    'authorization-report-gmp-packing-scale-calibration' =>
      realpath(dirname(__FILE__).'/authorization-report-gmp-packing-scale-calibration.php')
  ]
];

?>
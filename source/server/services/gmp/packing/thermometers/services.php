<?php

$thermometers = [
  'tables' => [
    'gmp\packing\thermometers\Logs' =>
      realpath(dirname(__FILE__).'/Logs.php'),
    'gmp\packing\thermometers\Thermometers' =>
      realpath(dirname(__FILE__).'/Thermometers.php'),
  ],
  'services' => [
    'upload-manual-gmp-packing-thermo-calibration' =>
      realpath(dirname(__FILE__).'/upload-manual-gmp-packing-thermo-calibration.php'),
    'log-gmp-packing-thermo-calibration' =>
      realpath(dirname(__FILE__).'/log-gmp-packing-thermo-calibration.php'),
    'capture-gmp-packing-thermo-calibration' =>
      realpath(dirname(__FILE__).'/capture-gmp-packing-thermo-calibration.php'),
    'report-gmp-packing-thermo-calibration' =>
      realpath(dirname(__FILE__).'/report-gmp-packing-thermo-calibration.php'),
    'inventory-gmp-packing-thermo-calibration' =>
      realpath(dirname(__FILE__).'/inventory-gmp-packing-thermo-calibration.php'),
    'add-gmp-packing-thermo-calibration' =>
      realpath(dirname(__FILE__).'/add-gmp-packing-thermo-calibration.php'),
    'toggle-gmp-packing-thermo-calibration' =>
      realpath(dirname(__FILE__).'/toggle-gmp-packing-thermo-calibration.php'),
  ]
];

?>
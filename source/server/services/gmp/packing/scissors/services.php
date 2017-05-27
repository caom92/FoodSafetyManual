<?php

$scissors = [
  'tables' => [
    'gmp\packing\scissors\Logs' =>
      realpath(dirname(__FILE__).'/Logs.php'),
    'gmp\packing\scissors\Groups' =>
      realpath(dirname(__FILE__).'/Groups.php'),
  ],
  'services' => [
    'upload-manual-gmp-packing-scissors-knives' =>
      realpath(dirname(__FILE__).'/upload-manual-gmp-packing-scissors-knives.php'),
    'log-gmp-packing-scissors-knives' =>
      realpath(dirname(__FILE__).'/log-gmp-packing-scissors-knives.php'),
    'capture-gmp-packing-scissors-knives' =>
      realpath(dirname(__FILE__).'/capture-gmp-packing-scissors-knives.php'),
    'report-gmp-packing-scissors-knives' =>
      realpath(dirname(__FILE__).'/report-gmp-packing-scissors-knives.php'),
    'inventory-gmp-packing-scissors-knives' =>
      realpath(dirname(__FILE__).'/inventory-gmp-packing-scissors-knives.php'),
    'add-gmp-packing-scissors-knives' =>
      realpath(dirname(__FILE__).'/add-gmp-packing-scissors-knives.php'),
    'toggle-gmp-packing-scissors-knives' =>
      realpath(dirname(__FILE__).'/toggle-gmp-packing-scissors-knives.php'),
    'update-gmp-packing-scissors-knives' =>
      realpath(dirname(__FILE__).'/update-gmp-packing-scissors-knives.php'),
    'authorization-report-gmp-packing-scissors-knives' =>
      realpath(dirname(__FILE__).'/authorization-report-gmp-packing-scissors-knives.php')
  ]
];

?>
<?php

$unusualOccurrences = [
  'tables' => [
    'unusualOccurrence\Logs' =>
      realpath(dirname(__FILE__).'/Logs.php'),
  ],
  'services' => [
    'upload-manual-gmp-packing-unusual-occurrence' =>
      realpath(dirname(__FILE__).'/upload-manual-gmp-packing-unusual-occurrence.php'),
    'log-gmp-packing-unusual-occurrence' =>
      realpath(dirname(__FILE__).'/log-gmp-packing-unusual-occurrence.php'),
    'capture-gmp-packing-unusual-occurrence' =>
      realpath(dirname(__FILE__).'/capture-gmp-packing-unusual-occurrence.php'),
    'report-gmp-packing-unusual-occurrence' =>
      realpath(dirname(__FILE__).'/report-gmp-packing-unusual-occurrence.php'),
    'update-gmp-packing-unusual-occurrence' =>
      realpath(dirname(__FILE__).'/update-gmp-packing-unusual-occurrence.php'),
    'authorization-report-gmp-packing-unusual-occurrence' =>
      realpath(dirname(__FILE__).'/authorization-report-gmp-packing-unusual-occurrence.php')
  ]
];

?>
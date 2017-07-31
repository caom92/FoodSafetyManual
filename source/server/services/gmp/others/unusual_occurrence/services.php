<?php

$gmpOthersUnusualOccurrences = [
  'tables' => [
    'gmp\others\unusualOccurrence\Logs' =>
      realpath(dirname(__FILE__).'/Logs.php'),
  ],
  'services' => [
    'upload-manual-gmp-others-unusual-occurrence' =>
      realpath(dirname(__FILE__).'/upload-manual-gmp-others-unusual-occurrence.php'),
    'log-gmp-others-unusual-occurrence' =>
      realpath(dirname(__FILE__).'/log-gmp-others-unusual-occurrence.php'),
    'capture-gmp-others-unusual-occurrence' =>
      realpath(dirname(__FILE__).'/capture-gmp-others-unusual-occurrence.php'),
    'report-gmp-others-unusual-occurrence' =>
      realpath(dirname(__FILE__).'/report-gmp-others-unusual-occurrence.php'),
    'update-gmp-others-unusual-occurrence' =>
      realpath(dirname(__FILE__).'/update-gmp-others-unusual-occurrence.php'),
    'authorization-report-gmp-others-unusual-occurrence' =>
      realpath(dirname(__FILE__).'/authorization-report-gmp-others-unusual-occurrence.php')
  ]
];

?>
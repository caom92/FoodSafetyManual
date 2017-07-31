<?php

$gapOthersUnusualOccurrences = [
  'tables' => [
    'gap\others\unusualOccurrence\Logs' =>
      realpath(dirname(__FILE__).'/Logs.php'),
  ],
  'services' => [
    'upload-manual-gap-others-unusual-occurrence' =>
      realpath(dirname(__FILE__).'/upload-manual-gap-others-unusual-occurrence.php'),
    'log-gap-others-unusual-occurrence' =>
      realpath(dirname(__FILE__).'/log-gap-others-unusual-occurrence.php'),
    'capture-gap-others-unusual-occurrence' =>
      realpath(dirname(__FILE__).'/capture-gap-others-unusual-occurrence.php'),
    'report-gap-others-unusual-occurrence' =>
      realpath(dirname(__FILE__).'/report-gap-others-unusual-occurrence.php'),
    'update-gap-others-unusual-occurrence' =>
      realpath(dirname(__FILE__).'/update-gap-others-unusual-occurrence.php'),
    'authorization-report-gap-others-unusual-occurrence' =>
      realpath(dirname(__FILE__).'/authorization-report-gap-others-unusual-occurrence.php')
  ]
];

?>
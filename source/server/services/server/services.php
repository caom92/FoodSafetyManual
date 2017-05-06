<?php

$server = [
  'tables' => [
    'Logs' =>
      realpath(dirname(__FILE__).'/Logs.php')
  ],
  'services' => [
    'get-log-manual' =>
      realpath(dirname(__FILE__).'/get-log-manual.php'),
    'list-programs-modules-logs' =>
      realpath(dirname(__FILE__).'/list-programs-modules-logs.php'),
    'send-bug-report' =>
      realpath(dirname(__FILE__).'/send-bug-report.php'),
    'status' =>
      realpath(dirname(__FILE__).'/status.php')
  ]
];

?>
<?php

$authorizations = [
  'tables' => [
    'CapturedLogs' =>
      realpath(dirname(__FILE__).'/CapturedLogs.php'),
    'SupervisorsEmployees' =>
      realpath(dirname(__FILE__).'/SupervisorsEmployees.php')
  ],
  'services' => [
    'approve-log' =>
      realpath(dirname(__FILE__).'/approve-log.php'),
    'assign-employees-to-supervisors' =>
      realpath(dirname(__FILE__).'/assign-employees-to-supervisors.php'),
    'get-num-pending-logs' =>
      realpath(dirname(__FILE__).'/get-num-pending-logs.php'),
    'get-supervisor-num-of-employees' =>
      realpath(dirname(__FILE__).'/get-supervisor-num-of-employees.php'),
    'list-employees-of-supervisor' =>
      realpath(dirname(__FILE__).'/list-employees-of-supervisor.php'),
    'list-supervisors-by-zone' =>
      realpath(dirname(__FILE__).'/list-supervisors-by-zone.php'),
    'list-unapproved-logs-of-user' =>
      realpath(dirname(__FILE__).'/list-unapproved-logs-of-user.php'),
    'reject-log' =>
      realpath(dirname(__FILE__).'/reject-log.php'),
    'retreat-log' =>
      realpath(dirname(__FILE__).'/retreat-log.php')
  ]
];

?>
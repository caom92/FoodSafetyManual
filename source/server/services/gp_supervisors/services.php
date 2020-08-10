<?php

$gpSignatures = [
  'tables' => [
    'gpSupervisors\AssignedZones' =>
      realpath(dirname(__FILE__).'/AssignedZones.php')
  ],
  'services' => [
    'assign-zones-to-gp-supervisor' => 
      realpath(dirname(__FILE__).'/assign-zones-to-gp-supervisor.php'),
    'list-gp-signatures' => 
      realpath(dirname(__FILE__).'/list-gp-signatures.php'),
    'list-gp-supervisor-zones' => 
      realpath(dirname(__FILE__).'/list-gp-supervisor-zones.php'),
    'list-logs' => 
      realpath(dirname(__FILE__).'/list-logs.php'),
    'list-unsigned-logs' => 
      realpath(dirname(__FILE__).'/list-unsigned-logs.php'),
    'list-zone-names' => 
      realpath(dirname(__FILE__).'/list-zone-names.php'),
    'sign-log' => 
      realpath(dirname(__FILE__).'/sign-log.php')
  ]
];

?>
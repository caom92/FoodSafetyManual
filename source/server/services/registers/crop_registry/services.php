<?php

$cropRegistry = [
  'tables' => [
    'cropRegistry\Logs' => realpath(dirname(__FILE__).'/Logs.php')
  ],
  'services' => [
    'add-crop-registry' => realpath(dirname(__FILE__).'/add-crop-registry.php'),
    'view-crop-registry' => realpath(dirname(__FILE__).'/view-crop-registry.php')
  ]
];

?>
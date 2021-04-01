<?php

$cropRegistry = [
  'tables' => [
    'cropRegistry\Logs' => realpath(__DIR__.'/Logs.php')
  ],
  'services' => [
    'add-register-crop-registry-form' => realpath(__DIR__.'/add-register-crop-registry-form.php'),
    'view-crop-registry-form' => realpath(__DIR__.'/view-crop-registry-form.php')
  ]
];

?>
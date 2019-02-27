<?php

$capa = [
  'tables' => [
    'capa\Logs' => realpath(__DIR__.'/Logs.php'),
    'capa\Files' => realpath(__DIR__.'/Files.php'),
    'capa\Images' => realpath(__DIR__.'/Images.php'),
    'capa\Links' => realpath(__DIR__.'/Links.php')
  ],
  'services' => [
    'capture-capa-form' => realpath(__DIR__.'/capture-capa-form.php'),
    'authorization-report-capa-form' => realpath(__DIR__.'/authorization-report-capa-form.php'),
    'report-capa-form' => realpath(__DIR__.'/report-capa-form.php'),
    'update-capa-form' => realpath(__DIR__.'/update-capa-form.php'),
    'delete-capa-file' => realpath(__DIR__.'/delete-capa-file.php'),
    'delete-capa-image' => realpath(__DIR__.'/delete-capa-image.php'),
    'list-waiting-logs-capa-form' => realpath(__DIR__.'/list-waiting-logs-capa-form.php'),
    'approve-capa-form' => realpath(__DIR__.'/approve-capa-form.php')
  ]
];

?>
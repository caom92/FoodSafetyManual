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
    'delete-capa-file' => realpath(__DIR__.'/delete-capa-file.php'),
    'delete-capa-image' => realpath(__DIR__.'/delete-capa-image.php'),
    'list-waiting-logs-capa-form' => realpath(__DIR__.'/list-waiting-logs-capa-form.php')
    /*'get-menu' => realpath(__DIR__.'/get-menu.php'),
    'get-menu-by-user' => realpath(__DIR__.'/get-menu-by-user.php'),
    'get-menu-files' => realpath(__DIR__.'/get-menu-files.php'),
    'add-menu-directory' => realpath(__DIR__.'/add-menu-directory.php'),
    'add-menu-link' => realpath(__DIR__.'/add-menu-link.php'),
    'add-menu-file' => realpath(__DIR__.'/add-menu-file.php'),
    'delete-menu-element' => realpath(__DIR__.'/delete-menu-element.php'),
    'edit-menu-element' => realpath(__DIR__.'/edit-menu-element.php')*/
  ]
];

?>
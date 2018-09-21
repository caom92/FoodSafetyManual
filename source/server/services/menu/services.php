<?php

$menu = [
  'tables' => [
    'MenuItems' => realpath(__DIR__.'/MenuItems.php'),
    'MenuFiles' => realpath(__DIR__.'/MenuFiles.php')
  ],
  'services' => [
    'get-menu' => realpath(__DIR__.'/get-menu.php'),
    'get-menu-files' => realpath(__DIR__.'/get-menu-files.php'),
    'add-menu-directory' => realpath(__DIR__.'/add-menu-directory.php'),
    'add-menu-link' => realpath(__DIR__.'/add-menu-link.php'),
    'add-menu-file' => realpath(__DIR__.'/add-menu-file.php'),
    'delete-menu-element' => realpath(__DIR__.'/delete-menu-element.php'),
    'edit-menu-element' => realpath(__DIR__.'/edit-menu-element.php')
  ]
];

?>
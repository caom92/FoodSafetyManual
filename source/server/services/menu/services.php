<?php

$menu = [
  'tables' => [
    'MenuItems' => realpath(__DIR__.'/MenuItems.php')
  ],
  'services' => [
    'get-menu' => realpath(__DIR__.'/get-menu.php'),
    'add-menu-directory' => realpath(__DIR__.'/add-menu-directory.php'),
    'add-menu-link' => realpath(__DIR__.'/add-menu-link.php')
  ]
];

?>
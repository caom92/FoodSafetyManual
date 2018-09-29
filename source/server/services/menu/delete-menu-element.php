<?php

$service = [
  'requirements_desc' => [
    'logged_in' => 'any',
    'id' => [
      'type' => 'int',
      'min' => 1
    ]
  ],
  'callback' => function($scope, $request) {
    $itemsTable = $scope->daoFactory->get('MenuItems');

    $menuItem = $itemsTable->getById($request['id']);
    $parentDir = $itemsTable->getImageDirectory($request['id']);
    $parentDir = __DIR__."/../../../../data/menu/$parentDir";
    @unlink(realpath("$parentDir/{$menuItem['image']}"));

    $itemsTable->deleteById($request['id']);
  }   
];

?>
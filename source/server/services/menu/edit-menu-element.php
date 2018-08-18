<?php

require_once realpath(__DIR__.'/add-menu-item.php');

$arrayElementExists = function($array, $key) {
  return isset($array[$key]) && array_key_exists($key, $array);
};

$service = [
  'requirements_desc' => [
    'logged_in' => 'any',
    'id' => [
      'type' => 'int',
      'min' => 1
    ],
    'name' => [
      'type' => 'string',
      'max_length' => 255,
      'optional' => TRUE
    ],
    'icon' => [
      'type' => 'string',
      'max_length' => 255,
      'optional' => TRUE
    ],
    'image' => [
      'type' => 'files',
      'format' => 'bitmap',
      'optional' => TRUE
    ],
    'url' => [
      'type' => 'string',
      'max_length' => 65535,
      'optional' => TRUE
    ]
  ],
  'callback' => function($scope, $request) 
    use ($arrayElementExists, $storeUploadedFileInServer) {

    $itemsTable = $scope->daoFactory->get('MenuItems');
    $isDirectory = $itemsTable->isDirectory($request['id']);
    $updateValues = [];

    if ($arrayElementExists($request, 'name')) {
      $hasForwardSlash = strstr($request['name'], '/') !== FALSE;
      $hasBackwardSlash = strstr($request['name'], '\\') !== FALSE;
      if ($hasForwardSlash || $hasBackwardSlash) {
        throw new \Exception(
          'The name of the directory should not contain slashes', 1
        );
      }

      $updateValues['name'] = $request['name'];
    }

    if (!$isDirectory && $arrayElementExists($request, 'url')) {
      $updateValues['url'] = $request['url'];
    }

    if ($arrayElementExists($request, 'icon')) {
      $updateValues['icon'] = $request['icon'];
      $updateValues['image'] = NULL;
    }

    if ($arrayElementExists($request, 'image')) {
      $updateValues['image'] = $request['image'];
      $updateValues['icon'] = NULL;
    }

    if (isset($_FILES['image'])) {
      if (count($_FILES['image']) > 0) {
        $menuItem = $itemsTable->getById($request['id']);
        $parentDir = ($isDirectory) ? "directories/" : "links/";
        $parentDir = __DIR__."/../../../../data/menu/$parentDir/";
        if ($arrayElementExists($menuItem, 'image')) {
          @unlink(realpath("$parentDir/{$menuItem['image']}"));
        }
        $updateValues['image'] = 
          $storeUploadedFileInServer('image', realpath($parentDir));
      }
    }

    return $itemsTable->updateById($request['id'], $updateValues);
  }
];

?>
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
        if ($arrayElementExists($menuItem, 'image')) {
          $parentDir = ($isDirectory) ? "directories/" : "links/";
          $originalFileName = $_FILES['image']['name'];
          $wasFileMoved = move_uploaded_file(
            $_FILES['image']['tmp_name'], 
            realpath(
              __DIR__."/../../../../data/menu/$parentDir/{$menuItem['image']}"
            )
          );
          if (!$wasFileMoved) {
            throw new \Exception(
              "The file '{$originalFileName}' could not be uploaded."
            );
          }
        } else {
          $updateValues['image'] = $storeUploadedFileInServer(
            'image', 
            realpath(__DIR__.'/../../../../data/menu/'.($isDirectory) ? 
              'directories' : 'links'
            )
          );
        }
      }
    }

    return $itemsTable->updateById($request['id'], $updateValues);
  }
];

?>
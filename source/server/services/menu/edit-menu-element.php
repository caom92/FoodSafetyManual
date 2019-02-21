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
    ],
    'file' => [
      'type' => 'files',
      'format' => 'document',
      'optional' => TRUE
    ],
    'file_name' => [
      'type' => 'string',
      'max_length' => 255,
      'optional' => TRUE
    ],
    'file_id' => [
      'type' => 'int',
      'min' => 1,
      'optional' => TRUE
    ]
  ],
  'callback' => function($scope, $request) 
    use ($arrayElementExists, $storeUploadedFileInServer) {

    $itemsTable = $scope->daoFactory->get('MenuItems');
    $isDirectory = $itemsTable->isDirectory($request['id']);
    $isFile = $itemsTable->isFile($request['id']);
    $updateValues = [];

    if ($arrayElementExists($request, 'name')) {
      $hasForwardSlash = strstr($request['name'], '/') !== FALSE;
      $hasBackwardSlash = strstr($request['name'], '\\') !== FALSE;
      if ($hasForwardSlash || $hasBackwardSlash) {
        throw new \Exception(
          'The name of the directory should not contain slashes',
          1
        );
      }

      $updateValues['name'] = $request['name'];
    }

    if (!$isDirectory && $arrayElementExists($request, 'url')) {
      $updateValues['url'] = $request['url'];
    }

    if ($isFile && ($arrayElementExists($request, 'file_id') || ($arrayElementExists($request, 'file_name') && isset($_FILES['file'])))) {
      if (isset($_FILES['file']) && $arrayElementExists($request, 'file_name')) {
        $file = (count($_FILES['file']) > 0) ? 
          $storeUploadedFileInServer(
            'file', realpath(__DIR__."/../../../../data/menu/pdf")
          )
          : NULL;

        $menuFilesTable = $scope->daoFactory->get('MenuFiles');

        if(!is_null($file)) {
          $updateValues['file_id'] = $menuFilesTable->insert([
            'user_id' => $segment->get('user_id'),
            'zone_id' => $segment->get('zone_id'),
            'name' => $request['file_name'],
            'path' => $file,
            'upload_date' => date("Y-m-d")
          ]);
          $ret['path'] = $file;
          $ret['file_id'] = $updateValues['file_id'];
        } else {
          throw new \Exception(
            "The file could not be uploaded correctly",
            2
          );  
        }
      } else if ($arrayElementExists($request, 'file_id')) {
        $file = NULL;
        $updateValues['file_id'] = (strlen($request['file_id']) > 0) ?
          $request['file_id'] : NULL;
        $ret['file_id'] = $updateValues['file_id'];
      } else {
        throw new \Exception(
          "You must provide either a file ID or a file and filename to add a field icon to the menu",
          3
        );
      }
    }

    if ($arrayElementExists($request, 'icon')) {
      $updateValues['icon'] = $request['icon'];
      $updateValues['image'] = NULL;
      $menuItem = $itemsTable->getById($request['id']);
      $parentDir = $itemsTable->getImageDirectory($request['id']);
      $parentDir = __DIR__."/../../../../data/menu/$parentDir";
      @unlink(realpath("$parentDir/{$menuItem['image']}"));
    }

    if ($arrayElementExists($request, 'image')) {
      $updateValues['image'] = $request['image'];
      $updateValues['icon'] = NULL;
    }

    if (!$arrayElementExists($request, 'icon') && !$arrayElementExists($request, 'image')) {
      $updateValues['image'] = NULL;
      $updateValues['icon'] = NULL;
      $menuItem = $itemsTable->getById($request['id']);
      $parentDir = $itemsTable->getImageDirectory($request['id']);
      $parentDir = __DIR__."/../../../../data/menu/$parentDir";
      @unlink(realpath("$parentDir/{$menuItem['image']}"));
    }

    if (isset($_FILES['image'])) {
      if (count($_FILES['image']) > 0) {
        $updateValues['icon'] = NULL;
        $menuItem = $itemsTable->getById($request['id']);
        $parentDir = $itemsTable->getImageDirectory($request['id']);
        $parentDir = __DIR__."/../../../../data/menu/$parentDir";
        if ($arrayElementExists($menuItem, 'image')) {
          @unlink(realpath("$parentDir/{$menuItem['image']}"));
        }
        $updateValues['image'] = 
          $storeUploadedFileInServer('image', realpath($parentDir));
      }
    }

    $ret['result'] = $itemsTable->updateById($request['id'], $updateValues);
    if (isset($updateValues['image'])) {
      $ret['image'] = $updateValues['image']; 
    } else {
      $ret['image'] = NULL;
    }

    return $ret;
  }
];

?>
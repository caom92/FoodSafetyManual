<?php

$getFileSysSlash = function () {
  $osName = substr(PHP_OS, 0, 3);
  $osName = strtoupper($osName);
  return ($osName === 'WIN') ? '\\' : '/';
};

$storeUploadedFileInServer = 
  function($fileField, $destinationDir) use ($getFileSysSlash) {
    $s = $getFileSysSlash();
    $originalFileName = $_FILES[$fileField]['name'];
    $extension = 
      \pathinfo($originalFileName, \PATHINFO_EXTENSION);
    $basename = uniqid(rand(), TRUE);
    $wasFileMoved = @move_uploaded_file(
      $_FILES[$fileField]['tmp_name'], 
      "$destinationDir$s$basename.$extension"
    );
    if (!$wasFileMoved) {
      throw new \Exception(
        "The file '{$originalFileName}' could not be uploaded."
      );
    }

    return "$basename.$extension";
  };

$service = [
  'requirements_desc' => [
    'logged_in' => 'any',
    'parent_id' => [
      'type' => 'int',
      'min' => 1,
      'optional' => TRUE
    ],
    'name' => [
      'type' => 'string',
      'max_length' => 255
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
      'max_length' => 65535
    ]
  ],
  'callback' => function($scope, $request) use ($storeUploadedFileInServer) {
    $hasForwardSlash = strstr($request['name'], '/') !== FALSE;
    $hasBackwardSlash = strstr($request['name'], '\\') !== FALSE;
    if ($hasForwardSlash || $hasBackwardSlash) {
      throw new \Exception(
        'The name of the directory should not contain slashes', 1
      );
    }

    $image = (count($_FILES['image']) > 0) ? 
      $storeUploadedFileInServer(
        'image', realpath(__DIR__.'/../../../../data/menu/directories')
      )
      : NULL;

    $segment = $scope->session->getSegment('fsm');
    $scope->daoFactory->get('MenuItems')->insert([
      'user_id' => $segment->get('user_id'),
      'parent_id' => (isset($request['parent_id'])) ? 
        $request['parent_id'] : NULL,
      'is_directory' => FALSE,
      'name' => $request['name'],
      'icon' => (isset($request['icon'])) ?
        $request['icon'] : NULL,
      'image' => $image,
      'url' => $request['url']
    ]);
  }
];

?>
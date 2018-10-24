<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'zone_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'zone_name' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 10
    ],
    'company_name' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 255
    ],
    'company_address' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 255
    ],
    'logo' => [
      'type' => 'file',
      'format' => 'bitmap',
      'optional' => TRUE
    ]
  ],
  'callback' => function($scope, $request) {
    $zones = $scope->daoFactory->get('Zones'); 
    $currentZone = $zones->getByID($request['zone_id']);
    $isZoneNameDuplicated = 
      $zones->hasByName($request['zone_name'])
      && $currentZone['name'] != $request['zone_name'];

    if (!$isZoneNameDuplicated) {
      $fileName = NULL;
      
      if (isset($_FILES["logo"]) 
        && array_key_exists("logo", $_FILES)) {
        $length = count($_FILES["logo"]["tmp_name"]);

        if ($length > 0) {
          $format = substr(
            $_FILES['logo']['name'], 
            strpos($_FILES['logo']['name'], '.')
          );
          $fileName = date('Y-m-d_H-i-s').$format;
          
          $s = NULL;
          if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            $s = '\\';
          } else {
            $s = '/';
          }
      
          $uploadDir = 
            realpath(dirname(__FILE__)."/../../../../data/logos") . "$s$fileName";
      
          $wasMoveSuccessful = move_uploaded_file(
            $_FILES['logo']['tmp_name'], 
            $uploadDir
          );
      
          if (!$wasMoveSuccessful) {
            throw new \Exception(
              'The file '.$_FILES['logo']['name'].
              ' could not be uploaded.', 2
            );
          }
        }
      }

      // Manual directories must be renamed in order to work after the name change

      $currentZoneLength = strlen(strtolower($currentZone['name']));
      $path = realpath(dirname(__FILE__)."/../../../../data/documents/manuals/");
      $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path), RecursiveIteratorIterator::SELF_FIRST);

      $uniqueDirectories = array();
      $finalDirectories = array();
      $renameableDirectories = array();
      
      foreach($iterator as $file) {
        if($file->isDir()) {
          array_push($uniqueDirectories, $file->getPath());
        }
      }    
      $uniqueDirectories = array_unique($uniqueDirectories);

      foreach($uniqueDirectories as $directory) {
        $check = false;
        foreach($uniqueDirectories as $compare) {
          if($compare !== $directory)
            $check = strrpos($compare, $directory);
          if($check !== false)
            break;
        }
        if($check === false)
          array_push($finalDirectories, $directory);
      }

      foreach($finalDirectories as $directory) {
        $position = strrpos($directory, DIRECTORY_SEPARATOR.strtolower($currentZone['name']));
        if($position !== false) {
          if($position + strlen(DIRECTORY_SEPARATOR.strtolower($currentZone['name'])) == strlen($directory)) {
            array_push($renameableDirectories, $directory);
          }
        }
      }

      foreach($renameableDirectories as $directory) {
        rename($directory, substr($directory, 0, (-$currentZoneLength)).strtolower($request['zone_name']));
      }

      if (isset($fileName)) {
        $zones->updateByZoneID($request['zone_id'], [
          'name' => $request['zone_name'],
          'company_name' => $request['company_name'],
          'address' => $request['company_address'],
          'logo_path' => $fileName
        ]);
      } else {
        $zones->updateByZoneID($request['zone_id'], [
          'name' => $request['zone_name'],
          'company_name' => $request['company_name'],
          'address' => $request['company_address']
        ]);
      }
    } else {
      throw new \Exception(
        'Cannot change zone name; the name is already taken.', 1);
    }
  }
];

?>
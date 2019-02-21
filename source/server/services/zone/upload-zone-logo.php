<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'zone_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'logo' => [
      'type' => 'files',
      'format' => 'bitmap'
    ]
  ],
  'callback' => function($scope, $request) {
    $zones = $scope->daoFactory->get('Zones'); 

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
        ' could not be uploaded.',
        1
      );
    }

    $zones->updateByZoneID($request['zone_id'], [
      'logo_path' => $fileName
    ]);

    return $fileName;
  }
];

?>
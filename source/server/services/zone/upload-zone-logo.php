<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'zone_id' => [
      'type' => 'string',
      'length' => 3
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

    $uploadDir = realpath(
      dirname(__FILE__)."/../../../../data/logos/{$fileName}");

    $wasMoveSuccessful = move_uploaded_file(
      $_FILES['logo']['tmp_name'], 
      $uploadDir
    );

    if (!$wasMoveSuccessful) {
      throw new \Exception(
        'The file '.$_FILES['logo']['name'].
        ' could not be uploaded.'
      );
    }

    $zones->updateByZoneID($request['zone_id'], [
      'logo_path' => $request['logo']
    ]);
  }
];

?>
<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor', 'Manager', 'Director'],
    'id' => [
      'type' => 'int',
      'min' => 1
    ]
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $imagesTable = $scope->daoFactory->get('capa\Images');

    $imagePath = $imagesTable->getPathByFileID($request['id']);

    if (@unlink(realpath(dirname(__FILE__)."/../../../../data/capa/images/".$imagePath))) {
      $imagesTable->deleteByID($request['id']);
    } else {
      throw new \Exception('Image does not exist');
    }

    
  }
];

?>
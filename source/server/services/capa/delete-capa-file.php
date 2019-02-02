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
    $filesTable = $scope->daoFactory->get('capa\Files');

    $filePath = $filesTable->getPathByFileID($request['id']);

    if (@unlink(realpath(dirname(__FILE__)."/../../../../data/capa/documents/".$filePath))) {
      $filesTable->deleteByID($request['id']);
    } else {
      throw new \Exception('File does not exist');
    }

    
  }
];

?>
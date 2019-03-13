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
    $capaLogs = $scope->daoFactory->get('capa\Logs');
    $capaFiles = $scope->daoFactory->get('capa\Files');
    $capaImages = $scope->daoFactory->get('capa\Images');

    // get list of files, and delete each one, first from file system, then from database
    $files = $capaFiles->selectByFormID($request['id']);
    foreach ($files as $file) {
      if (@unlink(realpath(dirname(__FILE__)."/../../../../data/capa/documents/".$file['path']))) {
        $capaFiles->deleteByID($file['id']);
      }
    }

    // get list of images, and delete each one, first from file system, then from database
    $images = $capaImages->selectByFormID($request['id']);
    foreach ($images as $image) {
      if (@unlink(realpath(dirname(__FILE__)."/../../../../data/capa/images/".$image['path']))) {
        $capaImages->deleteByID($image['id']);
      }
    }

    // check if all files and images from this CAPA form have been deleted
    $files = $capaFiles->selectByFormID($request['id']);
    $images = $capaImages->selectByFormID($request['id']);

    if (count($images) == 0 && count($files) == 0) {
      // if no files are associated to the report, delete register in DB for CAPA form
      $capaLogs->deleteByID($request['id']);
    } else {
      // maybe some files couldn't be deleted, they were manually deleted beforehand, lost or misplaced
      // in this case, system administrator should be notified and CAPA form won't be deleted for the time being
      throw new \Exception('Some files couldn\'t be deleted; if this error continues, contact the system administrator', 1);
    }
  }
];

?>
<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'supervisor_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'signature_file' => [
      'type' => 'files',
      'format' => 'bitmap'
    ]
  ],
  'callback' => function($scope, $request) {
    // get the current date
    $format = substr(
      $_FILES['signature_file']['name'], 
      strpos($_FILES['signature_file']['name'], '.')
    );
    $fileName = 
      "{$request['supervisor_id']}_" 
      . date('Y-m-d_H:i:s') 
      . "{$format}";

    // if it was, compute the full directory path where the file
    // will be stored
    $uploadDir = realpath(
      dirname(__FILE__)."/../../../../data/signatures") . "/{$fileName}";

    // finally save the uploaded file as the current manual file
    $wasMoveSuccessful = move_uploaded_file(
      $_FILES['signature_file']['tmp_name'], 
      $uploadDir
    );

    // and check if the file was saved successfully
    if (!$wasMoveSuccessful) {
      // and notify the user of the error
      throw new \Exception(
        'The file '.$_FILES['signature_file']['name'].
        ' could not be uploaded.'
      );
    }

    // store the file path in the database
    $scope->daoFactory->get('Users')->updateSignaturePathByID(
      $request['supervisor_id'], $fileName);

    return $fileName;
  }
];

?>
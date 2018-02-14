<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'new_zone' => [
      'type' => 'string',
      'length' => 3
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
    $isZoneNameDuplicated = $zones->hasByName($request['new_zone']);

    if (!$isZoneNameDuplicated) {
      $fileName = '';

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

      $zoneID = $zones->insert([
        'name' => $request['new_zone'],
        'company_name' => $request['company_name'],
        'address' => $request['company_address'],
        'logo_path' => $fileName
      ]);

      $logs = $scope->daoFactory->get('Logs')->selectAll();
      $footers = $scope->daoFactory->get('ReportFooters');

      foreach ($logs as $log) {
        $footers->insert([
          'zone_id' => $zoneID,
          'log_id' => $log['log_id'],
          'capture_form_footer' => '',
          'report_document_footer' => ''
        ]);
      }

      return $zoneID;
    } else {
      throw new \Exception('Cannot add new zone; name is already taken.', 1);
    }
  }
];

?>
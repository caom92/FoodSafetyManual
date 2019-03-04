<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor', 'Manager', 'Director'],
    'capa_number' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 255,
      'optional' => true
    ],
    'reference_number' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 255,
      'optional' => true
    ],
    'capture_date' => [
      'type' => 'datetime',
      'format' => 'Y-m-d',
      'optional' => true
    ],
    'reference' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 65535,
      'optional' => true
    ],
    'description' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 65535,
      'optional' => true
    ],
    'observer' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 255,
      'optional' => true
    ],
    'occurrence_date' => [
      'type' => 'datetime',
      'format' => 'Y-m-d',
      'optional' => true
    ],
    'findings' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 65535,
      'optional' => true
    ],
    'root_cause' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 65535,
      'optional' => true
    ],
    'preventive_actions' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 65535,
      'optional' => true
    ],
    'corrective_actions' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 65535,
      'optional' => true
    ],
    'planned_date' => [
      'type' => 'datetime',
      'format' => 'Y-m-d',
      'optional' => true
    ],
    'assigned_personnel' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 255,
      'optional' => true
    ],
    'follow_up' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 65535,
      'optional' => true
    ],
    'actual_date' => [
      'type' => 'datetime',
      'format' => 'Y-m-d',
      'optional' => true
    ],
    'status' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 255,
      'optional' => true
    ],
    'link' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 65535,
      'optional' => true
    ],
    'images' => [
      'type' => 'files',
      'format' => 'bitmap',
      'optional' => true
    ],
    'files' => [
      'type' => 'files',
      'format' => 'documents',
      'optional' => true
    ]
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $capaTable = $scope->daoFactory->get('capa\Logs');

    // original submitter, we use their user ID and zone ID
    $zoneID = $segment->get('zone_id');
    $userID = $segment->get('user_id');

    // fill table; only creator_id, zone_id and capture_date are strictly required
    // also, accepter_id and closure_date are never included in first capture
    $formID = $capaTable->insert([
      'capa_number' => (isset($request['capa_number']) && array_key_exists('capa_number', $request)) ? $request['capa_number'] : NULL,
      'reference_number' => (isset($request['reference_number']) && array_key_exists('reference_number', $request)) ? $request['reference_number'] : NULL,
      'creator_id' => $userID,
      'zone_id' => $zoneID,
      'capture_date' => $request['capture_date'],
      'reference' => (isset($request['reference']) && array_key_exists('reference', $request)) ? $request['reference'] : NULL,
      'description' => (isset($request['description']) && array_key_exists('description', $request)) ? $request['description'] : NULL,
      'observer' => (isset($request['observer']) && array_key_exists('observer', $request)) ? $request['observer'] : NULL,
      'occurrence_date' => (isset($request['occurrence_date']) && array_key_exists('occurrence_date', $request)) ? $request['occurrence_date'] : NULL,
      'findings' => (isset($request['findings']) && array_key_exists('findings', $request)) ? $request['findings'] : NULL,
      'root_cause' => (isset($request['root_cause']) && array_key_exists('root_cause', $request)) ? $request['root_cause'] : NULL,
      'preventive_actions' => (isset($request['preventive_actions']) && array_key_exists('preventive_actions', $request)) ? $request['preventive_actions'] : NULL,
      'corrective_actions' => (isset($request['corrective_actions']) && array_key_exists('corrective_actions', $request)) ? $request['corrective_actions'] : NULL,
      'planned_date' => (isset($request['planned_date']) && array_key_exists('planned_date', $request)) ? $request['planned_date'] : NULL,
      'assigned_personnel' => (isset($request['assigned_personnel']) && array_key_exists('assigned_personnel', $request)) ? $request['assigned_personnel'] : NULL,
      'follow_up' => (isset($request['follow_up']) && array_key_exists('follow_up', $request)) ? $request['follow_up'] : NULL,
      'actual_date' => (isset($request['actual_date']) && array_key_exists('actual_date', $request)) ? $request['actual_date'] : NULL,
      'status' => (isset($request['status']) && array_key_exists('status', $request)) ? $request['status'] : NULL,
      'link' => (isset($request['link']) && array_key_exists('link', $request)) ? $request['link'] : NULL
    ]);

    // if add was successful, we obtain the inserted ID so we can use it to add files
    //$formID = $capaTable->lastInsertId();

    $uploadFiles = function($field, $uploadDir) use ($formID) {
      $files = [];

      $length = count($_FILES[$field]['name']);

      for ($i = 0; $i < $length; $i++) { // individual file array
        $originalFileName = $_FILES[$field]['name'][$i];
        $format = substr($originalFileName, strpos($originalFileName, '.'));

        $fileName = "{$formID}_".date('Y-m-d_H-i-s')."_$i$format";

        $s = NULL;
        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
          $s = '\\';
        } else {
          $s = '/';
        }

        $wasMoveSuccessful = move_uploaded_file(
          $_FILES[$field]['tmp_name'][$i], 
          $uploadDir . "$s$fileName"
        );

        if (!$wasMoveSuccessful) {
          throw new \Exception(
            "The file '{$originalFileName}' could not be uploaded."
          );
        }

        array_push($files, $fileName);
      }

      return $files;
    };
    
    /*if (isset($request['links']) && array_key_exists('links', $request)) {
      if($request['links'] > 0) {
        $linksTable = $scope->daoFactory->get('capa\Links');

        foreach ($links as $link) {
          $linksTable->insert([
            'form_id' => $formID,
            'link' => $link
          ]);
        }
      }
    }*/

    $images = (isset($_FILES['images']) && array_key_exists('images', $_FILES)) ?
      $uploadFiles('images', realpath(dirname(__FILE__)."/../../../../data/capa/images/")) : [];
    
    if (count($images) > 0) {
      $imagesTable = $scope->daoFactory->get('capa\Images');

      foreach ($images as $image) {
        $imagesTable->insert([
          'form_id' => $formID,
          'path' => $image
        ]);
      }
    }

    $files = (isset($_FILES['files']) && array_key_exists('files', $_FILES)) ?
      $uploadFiles('files', realpath(dirname(__FILE__)."/../../../../data/capa/documents/")) : [];

    if (count($files) > 0) {
      $filesTable = $scope->daoFactory->get('capa\Files');

      foreach ($files as $file) {
        $filesTable->insert([
          'form_id' => $formID,
          'path' => $file
        ]);
      }
    }

    return $formID;
  }
];

?>
<?php

require_once realpath(__DIR__.'/add-menu-item.php');

$arrayElementExists = function($array, $key) {
  return isset($array[$key]) && array_key_exists($key, $array);
};

$service = [
  'requirements_desc' => $requirementsDesc + [
    'file' => [
      'type' => 'files',
      'format' => 'document',
      'optional' => TRUE
    ],
    'file_name' => [
      'type' => 'string',
      'max_length' => 255,
      'optional' => TRUE
    ],
    'file_id' => [
      'type' => 'int',
      'min' => 1,
      'optional' => TRUE
    ]
  ],
  'callback' => $getAddMenuItemCallback('files', 
    function($request, $segment, $image, $scope) use ($arrayElementExists, $storeUploadedFileInServer) {
      if ($arrayElementExists($request, 'parent_id')) {
        $parentId = (strlen($request['parent_id']) > 0) ?
          $request['parent_id'] : NULL;
      } else {
        $parentId = NULL;
      }

      if (isset($_FILES['file']) && $arrayElementExists($request, 'file_name')) {
        $file = (count($_FILES['file']) > 0) ? 
          $storeUploadedFileInServer(
            'file', realpath(__DIR__."/../../../../data/menu/pdf")
          )
          : NULL;

        $menuFilesTable = $scope->daoFactory->get('MenuFiles');

        if(!is_null($file)) {
          $fileId = $menuFilesTable->insert([
            'user_id' => $segment->get('user_id'),
            'zone_id' => $segment->get('zone_id'),
            'name' => $request['file_name'],
            'path' => basename($file, '.pdf'),
            'upload_date' => date("Y-m-d")
          ]);
        } else {
          throw new \Exception(
            "The file could not be uploaded correctly"
          );  
        }
      } else if ($arrayElementExists($request, 'file_id')) {
        $file = NULL;
        $fileId = (strlen($request['file_id']) > 0) ?
          $request['file_id'] : NULL;
      } else {
        throw new \Exception(
          "You must provide either a file ID or a file and filename to add a field icon to the menu"
        );
      }

      return [
        'user_id' => $segment->get('user_id'),
        'parent_id' => $parentId,
        'type_id' => 3,
        'name' => $request['name'],
        'icon' => (isset($request['icon'])) ?
          $request['icon'] : NULL,
        'image' => $image,
        'file_id' => $fileId
      ];
    }
  )
];

?>
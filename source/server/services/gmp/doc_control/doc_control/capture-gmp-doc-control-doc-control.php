<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createCaptureService(
  'GMP',
  'Document Control',
  'Document Control',
  [
    'documents' => [
      'type' => 'array',
      'values' => [
        'id' => [
          'type' => 'int',
          'min' => 1
        ],
        'entries' => [
          'type' => 'array',
          'values' => [
            'date' => [
              'type' => 'datetime',
              'format' => 'Y-m-d'
            ],
            'employee' => [
              'type' => 'string',
              'min_length' => 1,
              'max_length' => 255
            ],
            'notes' => [
              'type' => 'string',
              'min_length' => 1,
              'max_length' => 65535,
              'optional' => TRUE
            ],
            'additional_info_url' => [
              'type' => 'string',
              'min_length' => 1,
              'max_length' => 65535,
              'optional' => TRUE
            ],
            'pictures_start' => [
              'type' => 'int',
              'min' => 0,
              'optional' => TRUE
            ],
            'pictures_length' => [
              'type' => 'int',
              'min' => 1,
              'optional' => TRUE
            ],
            'files_start' => [
              'type' => 'int',
              'min' => 0,
              'optional' => TRUE
            ],
            'files_length' => [
              'type' => 'int',
              'min' => 1,
              'optional' => TRUE
            ]
          ]
        ]
      ]
    ],
    'pictures' => [
      'type' => 'files',
      'format' => 'bitmap',
      'optional' => TRUE
    ],
    'files' => [
      'type' => 'files',
      'format' => 'documents',
      'optional' => TRUE
    ]
  ],
  [
    'extra_info' => NULL,    
    'function' => function($scope, $segment, $request, $logID) {
      // guardamos una instacia del DAO de esta bitacora
      $logs = $scope->daoFactory->get('gmp\docControl\docControl\Logs');

      // inicializamos un arreglos de registros que van a ser almacenados en la 
      // base de datos
      $logData = [];

      // esta funcion sube los archivos especificados del arreglo de archivos 
      // al servidor y luego retorna los nombres con los cuales fueron guardados
      $uploadFiles = function($field, $start, $length, $uploadDir) use ($logID) {
        // arreglo temporal para guardar los nombres de los archivos
        $files = [];

        // luego visitamos cada imagen
        for ($i = $start; $i < $length; ++$i) {
          // obtenemos el formato del archivo
          $originalFileName = $_FILES[$field]['name'][$i];
          $format = 
            substr($originalFileName, strpos($originalFileName, '.'));

          // generamos el nombre del archivo
          $fileName = 
            "{$logID}_" . 
            date('Y-m-d_H-i-s') . 
            "_$i$format";

          $s = NULL;
          if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            $s = '\\';
          } else {
            $s = '/';
          }

          // y movemos el archivo al directorio donde sera almacenado
          $wasMoveSuccessful = move_uploaded_file(
            $_FILES[$field]['tmp_name'][$i], 
            $uploadDir . "$s$fileName"
          );

          // revisamos si el archivo se almaceno con exito, lanzando una
          // excepcion si no fue asi
          if (!$wasMoveSuccessful) {
            throw new \Exception(
              "The file '{$originalFileName}' could not be uploaded."
            );
          }

          // por ultimo, guardamos el nombre del archivo subido en la 
          // estructura de datos con los datos a guardar en la tabla
          array_push($files, $fileName);
        } // for ($i = $start; $i < $length; ++$i)

        // retornamos los nombres de los archivos
        return $files;
      };

      // visitamos cada entrada enviada por el usuario
      foreach ($request['documents'] as $document) {
        foreach ($document['entries'] as $entry) {
          // preparamos los datos que van a ser ingresados en la BD
          $data = [
            'capture_date_id' => $logID,
            'document_id' => $document['id'],
            'document_employee' => $entry['employee'],
            'document_date' => $entry['date'],
            'notes' => 
              (isset($entry['notes']) && array_key_exists('notes', $entry)) ?
                $entry['notes'] : NULL,
            'additional_info_url' => 
              (isset($entry['additional_info_url']) 
                && array_key_exists('additional_info_url', $entry)) ?
                $entry['additional_info_url'] : NULL,
            'pictures' => NULL,
            'files' => NULL
          ];

          // revisamos si el usuario envio imagenes
          $werePicturesUploaded = 
            isset($_FILES['pictures']) 
            && array_key_exists('pictures', $_FILES);

          $wereDocumentsUploaded = 
            isset($_FILES['files']) 
            && array_key_exists('files', $_FILES);

          // arreglo temporal para guardar los nombres de los archivos
          $images = ($werePicturesUploaded) ? 
            $uploadFiles(
              'pictures', 
              $entry['pictures_start'], 
              $entry['pictures_length'], 
              realpath(
                dirname(__FILE__)."/../../../../../../data/images/".
                "gmp/doc_control/doc_control/"
              )
            )
            : [];

          $documents = ($wereDocumentsUploaded) ? 
            $uploadFiles(
              'files', 
              $entry['files_start'], 
              $entry['files_length'], 
              realpath(
                dirname(__FILE__)."/../../../../../../data/documents/".
                "gmp/doc_control/doc_control/"
              )
            )
            : [];

          // guardamos los datos a subir en el conglomerado
          if (count($images) > 0) {
            $data['pictures'] = json_encode($images);
          }

          // guardamos los datos a subir en el conglomerado
          if (count($documents) > 0) {
            $data['files'] = json_encode($documents);
          }

          array_push($logData, $data);
        } // foreach ($document['entries'] as $entry)
      } // foreach ($request['documents'] as $document)

      // finalmente, ingresamos los datos en la tabla
      $logs->insert($logData);
    }
  ]
);

?>
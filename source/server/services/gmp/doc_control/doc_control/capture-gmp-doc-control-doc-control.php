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
            'pictures' => [
              'type' => 'files',
              'format' => 'bitmap',
              'optional' => TRUE
            ]
          ]
        ]
      ]
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

      // visitamos cada entrada enviada por el usuario
      $i = 0;
      foreach ($request['documents'] as $document) {
        $j = 0;
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
            'picture1' => NULL,
            'picture2' => NULL
          ];

          // revisamos si el usuario envio imagenes
          // echo var_dump($_FILES);
          $werePicturesUploaded = 
            isset($_FILES['documents']) 
            && array_key_exists('documents', $_FILES);

          // si asi fue, hay que guardarlas en el servidor
          if ($werePicturesUploaded) {
            // primero generamos la direccion donde van a almacenarse las 
            // imagenes
            $uploadDir = realpath(
              dirname(__FILE__)."/../../../../../../data/images/".
              "gmp/doc_control/doc_control/"
            );

            // luego visitamos cada imagen
            for ($k = 0; $k < count($_FILES['documents']['name'][$i]['entries'][$j]['pictures']); ++$k) {
              // obtenemos el formato del archivo
              $originalFileName = 
                $_FILES['documents']['name'][$i]['entries'][$j]['pictures'][$k];
              $format = 
                substr($originalFileName, strpos($originalFileName, '.'));

              // generamos el nombre del archivo
              $fileName = "{$logID}_" . date('Y-m-d_H-i-s') . "_$k$format";

              $s = NULL;
              if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
                $s = '\\';
              } else {
                $s = '/';
              }

              // y movemos el archivo al directorio donde sera almacenado
              $wasMoveSuccessful = move_uploaded_file(
                $_FILES['documents']['tmp_name'][$i]['entries'][$j]['pictures'][$k], 
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
              $data['picture' . ($k + 1)] = $fileName;
            } // for ($k = 0; $k < count($_FILES['pictures']); ++$k)
          } // if ($werePicturesUploaded)

          // guardamos los datos a subir en el conglomerado
          array_push($logData, $data);
          ++$j;
        } // foreach ($document['entries'] as $entry)
        ++$i;
      } // foreach ($request['documents'] as $document)

      // finalmente, ingresamos los datos en la tabla
      $logs->insert($logData);
    }
  ]
);

?>
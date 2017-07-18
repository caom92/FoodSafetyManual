<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createCaptureService(
  'GMP',
  'Document Control',
  'Document Control',
  [
    'documents' => [
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
            'picture1' => NULL,
            'picture2' => NULL
          ];

          // revisamos si el usuario envio imagenes
          $werePicturesUploaded = 
            isset($_FILES['pictures']) && array_key_exists('pictures', $_FILES);

          // si asi fue, hay que guardarlas en el servidor
          if ($werePicturesUploaded) {
            // primero generamos la direccion donde van a almacenarse las 
            // imagenes
            $uploadDir = realpath(
              dirname(__FILE__)."/../../../data/images/".
              "gmp/packing/doc_control/"
            );

            // luego visitamos cada imagen
            for ($i = 0; $i < count($_FILES['pictures']); ++$i) {
              // obtenemos el formato del archivo
              $format = substr(
                $_FILES['pictures']['name'][$i], 
                strpos($_FILES['pictures']['name'][$i], '.')
              );

              // generamos el nombre del archivo
              $fileName = "$logID_" . date('Y-m-d_H:i:s') . "_$i.$format";

              // y movemos el archivo al directorio donde sera almacenado
              $wasMoveSuccessful = move_uploaded_file(
                $_FILES['pictures']['tmp_name'][$i], 
                $uploadDir . "/$fileName"
              );

              // revisamos si el archivo se almaceno con exito, lanzando una
              // excepcion si no fue asi
              if (!$wasMoveSuccessful) {
                throw new \Exception(
                  'The file '.$_FILES['pictures']['name'][$i].
                  ' could not be uploaded.'
                );
              }

              // por ultimo, guardamos el nombre del archivo subido en la 
              // estructura de datos con los datos a guardar en la tabla
              $data['picture' . ($i + 1)] = $fileName;
            }
          }

          // guardamos los datos a subir en el conglomerado
          array_push($logData, $data);
        }
      }

      // finalmente, ingresamos los datos en la tabla
      $logs->insert($logData);
    }
  ]
);

?>
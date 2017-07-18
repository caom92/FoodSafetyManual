<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createUpdateService(
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
          ]
        ]
      ]
    ]
  ],
  [
    'extra_info' => NULL,
    'function' => function($scope, $request) {
      // guardamos una instacia del DAO de esta bitacora
      $logs = $scope->daoFactory->get('gmp\docControl\docControl\Logs');

      // visitamos cada entrada enviada por el usuario
      foreach ($request['documents'] as $document) {
        foreach ($document['entries'] as $entry) {
          // actualizamos los datos almacenados en la BD
          $logs->updateByCaptureDateIDAndDocumentID(
            $entry, $request['report_id'], $document['id']
          );
        }
      }
    }
  ]
);

?>
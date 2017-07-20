<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createAuthorizationReportService(
  'GMP',
  'Document Control',
  'Document Control',
  [
    'items_name' => 'documents',
    'extra_info' => NULL,
    'function' => function($scope, $segment, $logDate) {
      // primero obtenemos todos los registros capturados en la fecha solicitada
      $rows = $scope->daoFactory->get('gmp\docControl\docControl\Logs')
        ->selectByCaptureDateID($logDate['id']);

      // inicializamos el arreglo donde seran devueltos todos los registros
      $documents = [];

      // inicializamos un almacenamiento temporal donde se iran guardando
      // los registros
      $document = [
        'id' => 0
      ];

      // visitamos cada registro leido de la BD
      foreach ($rows as $row) {
        // revisamos si el documento del registro cambio
        $hasDocumentChanged = $row['document_id'] != $document['id'];
        if ($hasDocumentChanged) {
          // si cambio, revisamos si es el primer registro leido
          if ($document['id'] != 0) {
            // si no lo es, guardamos los registros anteriores en el 
            // almacenamiento final para todos los registros
            array_push($documents, $document);
          }

          // e reiniciamos el almacenamiento temporal con la informacion
          // del documento actual
          $document = [
            'id' => $row['document_id'],
            'name' => $row['document_name'],
            'entries' => []
          ];

          // guardamos la informacion del documento actual en el almacenamiento
          // temporal
          array_push($document['entries'], [
            'employee' => $row['document_employee'],
            'date' => $row['document_date'],
            'notes' => $row['notes'],
            'additional_info_url' => $row['additional_info_url'],
            'pictures' => $row['pictures']
          ]);
        } else {
          // si el documento no ha cambiado, guardamos la informacion en el 
          // almacenamiento temporal
          array_push($document['entries'], [
            'employee' => $row['document_employee'],
            'date' => $row['document_date'],
            'notes' => $row['notes'],
            'additional_info_url' => $row['additional_info_url'],
            'pictures' => $row['pictures']
          ]);
        }
      }

      // no hay que olvidar almacenar el ultimo registro en el conglomerado
      if ($document['id'] != 0) {
        array_push($documents, $document);
      }

      // retornamos el almacenamiento conglomerado
      return $documents;
    }
  ]
);

?>
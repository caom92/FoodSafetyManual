<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createAddService(
  'GMP',
  'Document Control',
  'Document Control',
  [
    'name' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 255
    ]
  ],
  function($scope, $request) {
    // primero obtenemos el ID de la zona del usuario
    $segment = $scope->session->getSegment('fsm');
    $zoneID = $segment->get('zone_id');
    $documents = $scope->daoFactory->get('gmp\docControl\docControl\Documents');

    // revisamos si el nombre del documento esta duplicado en la misma zona
    // que el usuario
    $isNameDuplicated = $documents->hasByNameAndZoneID(
      $request['name'],
      $zoneID
    );

    // si asi es, lanzamos una excepcion
    if ($isNameDuplicated) {
      throw new \Exception('The document name is already taken.');
    }

    // si el nombre esta disponible, lo agregamos a la base de datos
    $documents->insert([
      'zone_id' => $zoneID,
      'name' => $request['name']
    ]);
  }
);

?>
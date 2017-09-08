<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createAddService(
  'GMP',
  'Packing',
  'Cold Room Temperature Control',
  [
    'name' => [
      'type' => 'string'
    ]
  ],
  function($scope, $request) {
    // primero obtenemos el ID de la zona
    $zoneID = $scope->session->getSegment('fsm')->get('zone_id');

    // obtenemos una instancia del DAO que controla los cuartos frios
    $rooms = $scope->daoFactory->get('gmp\packing\coldRoomTemp\Rooms');
    
    // revisamos si el nombre del cuarto frio esta repetido
    $isNameRepeated = $rooms->hasByNameAndZoneID(
      $request['name'], $zoneID
    );

    // si el nombre esta repetido, notificamos al usuario
    if ($isNameRepeated) {
      throw new \Exception(
        'Failed to add cold room; the name is already taken',
        1
      );
    }

    // almacenamos el objeto en la base de datos
    return $rooms->insert([
      'zone_id' => $segment->get('zone_id'),
      'is_active' => TRUE,
      'serial_num' => $request['name']
    ]);
  }
);

?>
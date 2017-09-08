<?php

namespace fsm\database\gmp\packing\coldRoomTemp;
require_once realpath(dirname(__FILE__).'/../../../../dao/ToggableItemsTable.php');
use fsm\database as db;


// Interfaz para la tabla gmp_packing_cold_room_temp_rooms
class Rooms extends db\ToggableItemsTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gmp_packing_cold_room_temp_rooms
  function __construct() { 
    parent::__construct('gmp_packing_cold_room_temp_rooms');
  }

  // Revisa si el nombre especificado ya esta repetido en la zona especificada
  // [in]   name (string): el nombre que va a ser revisado en la tabla
  // [in]   zoneID (uint): el ID de la zona donde se va a buscar el nombre
  // [out]  return (boolean): verdadero si el nombre ya esta registrado en la 
  //        tabla o falso en caso contrario
  function hasByNameAndZoneID($name, $zoneID) {
    return parent::has([
      'AND' => [
        'name' => $name,
        'zone_id' => $zoneID
      ]
    ]);
  }

  // Retorna una lista de todos los renglones de la tabla que tengan
  // registrado el ID de zona especificado independientemente del valor
  // que tenga asignado el campo de activacion
  // [in]   zoneID (uint): el ID de la zona cuyos cuartos frios van a ser leidos
  // [out]  return (dictionary): arreglo asociativo que contiene los datos
  //        de los cuartos frios registrados en la zona con el ID especificado
  //        organizados en renglones y columnas
  function selectAllByZoneID($zoneID) {
    return parent::select(
      [
        'id',
        'name',
        'is_active'
      ],
      [
        'zone_id' => $zoneID
      ]
    );
  }

  // Retorna una lista de todos los renglones que tengan el ID de zona 
  // especificado y que cuya columna de activacion esta asignada como verdadero
  // [in]   zoneID (uint): el ID de la zona cuyos cuartos frios van a ser leidos
  // [out]  return (dictionary): arreglo asociativo que contiene los datos de 
  //        los cuartos frios registrados en la zona con el ID especificado y 
  //        que se encuentren activos organizados en renglones y columnas
  function selectActiveByZoneID($zoneID) {
    return parent::select(
      ['id', 'name'],
      [
        'AND' => [
          'zone_id' => $zoneID,
          'is_active' => TRUE
        ]
      ]
    );
  }
}

?>
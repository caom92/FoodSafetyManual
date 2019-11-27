<?php

namespace fsm\database\gap\selfInspection\pestControl;
require_once realpath(dirname(__FILE__).'/../../../../dao/OrderedItemsTable.php');
use fsm\database as db;


// Interfaz para la tabla gap_self_inspection_pest_control_stations
class Stations extends db\OrderedItemsTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gap_self_inspection_pest_control_stations
  function __construct() { 
    parent::__construct('gap_self_inspection_pest_control_stations');
  }

  // Retorna el numero de renglones que tengan registrados el ID de habitacion
  // especificado
  // [in]   roomID (uint): el ID de la habitacion cuyas estaciones van a ser 
  //        contadas
  // [out]  return (uint): el numero de estaciones que estaban registradas a la
  //        habitacion con el ID especificado
  function countByRoomID($roomID) {
    return parent::count([ 
      'room_id' => $roomID
    ]);
  }

  // Retorna una lista de todos los renglones que tengan registrado el ID de
  // habitacion especificado
  // [in]   roomID (uint): el ID de la habitacion cuyas estaciones van a ser
  //        leidas
  // [out]  return (dictionary): arreglo asociativo que contiene los datos de 
  //        las estaciones registradas en la habitacion con el ID especificado
  //        organizados en renglones y columnas
  function selectByRoomID($roomID) {
    return parent::select(
      [
        'id', 'name', 'position', 'is_active'
      ],
      [
        'room_id' => $roomID,
        'ORDER' => [
          'position'
        ]
      ]
    );
  }
  
  // Retorna una lista de todos los renglones que tengan registrados el ID de 
  // zona especificado y que cuya columna de activacion este asignada como 
  // verdadero
  // [in]   zoneID (uint): el ID de la zona cuyas estaciones van a ser leidas
  // [out]  return (dictionary): arreglo asociativo que contiene los datos de
  //        las estaciones registradas en la zona con el ID especificado
  //        organizados en renglones y columnas
  function selectActiveByZoneID($zoneID) {
    return parent::select(
      [
        "r.id(room_id)",
        "r.name(room_name)",
        "$this->table.id(id)",
        "$this->table.name(name)",
        "$this->table.position(order)"
      ],
      [
        'AND' => [
          "r.zone_id" => $zoneID,
          'is_active' => TRUE
        ],
        'ORDER' => [
          "r.id",
          "$this->table.position"
        ]
      ],
      [
        '[><]gap_self_inspection_pest_control_rooms(r)' => [
          'room_id' => 'id'
        ]
      ]
    );
  }
}

?>
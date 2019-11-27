<?php

namespace fsm\database\gap\selfInspection\pestControl;
require_once realpath(dirname(__FILE__).'/../../../../dao/InsertableTable.php');
use fsm\database as db;


// Interfaz para la tabla gap_self_inspection_pest_control_rooms
class Rooms extends db\InsertableTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gap_self_inspection_pest_control_rooms
  function __construct() { 
    parent::__construct('gap_self_inspection_pest_control_rooms');
  }
  
  // Retorna la lista de renglones que tengan registrado el ID de zona 
  // especificado
  // [in]   zoneID (uint): el ID de la zona cuyas habitaciones van a ser leidas
  // [out]  return (dictionary): arreglo asociativo que contiene los datos de 
  //        todas las habitaciones registradas en la zona con el ID especificado
  //        organizados en renglones y columnas
  function selectByZoneID($zoneID) {
    return parent::select(
      [
        'id',
        'name'
      ],
      [
        "$this->table.zone_id" => $zoneID,
        'ORDER' => [
          'name'
        ]
      ]
    );
  }

  // Revisa si ya existe una habitacion en la zona indicada que tenga en nombre 
  // inidicado
  // [in]   zoneID (uint): el ID de la zona cuya habitacion queremos buscar
  // [in]   name (string): el nombre de la habitacion que queremos buscar
  // [out]  return (boolean): verdadero si ya existe el nombre de habitacion 
  //        ingresado en la zona indicada o falso en caso contrario
  function hasByZoneIDAndName($zoneID, $name) {
    return parent::has([
      'AND' => [
        'name' => $name,
        'zone_id' => $zoneID
      ]
    ]);
  }

  // Actualiza la habitacion con el ID especificado para que tenga el nombre 
  // indicado
  // [in]   roomID (uint): el ID de la habitacion cuyo nombre va a ser editado
  // [in]   name (string): el nuevo nombre que sera asignado a la habitación
  // [out]  return (uint): el numero de renglones que fueron editados   
  function updateNameByID($roomID, $name) {
    return parent::update(
      [ 'name' => $name ],
      [ 'id' => $roomID ]
    );
  }
}

?>
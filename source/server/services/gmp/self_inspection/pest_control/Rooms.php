<?php

namespace fsm\database\gmp\selfInspection\pestControl;
require_once realpath(dirname(__FILE__).'/../../../../dao/InsertableTable.php');
use fsm\database as db;


// Interfaz para la tabla gmp_self_inspection_pest_control_rooms
class Rooms extends db\InsertableTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gmp_self_inspection_pest_control_rooms
  function __construct() { 
    parent::__construct('gmp_self_inspection_pest_control_rooms');
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
        "$this->table.zone_id" => $zoneID
      ]
    );
  }
}

?>
<?php

namespace fsm\database\gmp\packing\scissors;
require_once realpath(dirname(__FILE__).'/../../../../dao/ToggableItemsTable.php');
use fsm\database as db;


// Interfaz para la tabla gmp_packing_scissors_groups
class Groups extends db\ToggableItemsTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gmp_packing_scissors_groups
  function __construct() { 
    parent::__construct('gmp_packing_scissors_groups');
  }

  // Retorna una lista de todos los renglones que tengan registrado el ID de 
  // zona especificado y que cuyo campo de activacion este asignado como 
  // verdadero
  // [in]   zoneID (uint): el ID de la zona cuyos renglones van a ser leidos
  // [out]  return (uint): arreglo asociativo que contiene los datos de los
  //        grupos de tijeras y cuchillos registrados en la zona con el ID 
  //        especificado y que se encuentren activados organizados en renglones 
  //        y columnas
  function selectActiveByZoneID($zoneID) {
    return parent::select(
      ['id', 'name', 'quantity'],
      [
        'AND' => [
          'zone_id' => $zoneID,
          'is_active' => TRUE
        ]
      ]
    );
  }

  // Retorna una listo de todos los renglones que tengan registardo el ID de
  // zona especificado independientemente del valor de su campo de activacion
  // [in]   zoneID (uint): el ID de la zona cuyos renglones van a ser leidos
  // [out]  return (uint): arreglo asociativo que contiene los datos de los
  //        grupos de tijeras y cuchillos registrados en la zona con el ID 
  //        especificado organizados en renglones y columnas
  function selectAllByZoneID($zoneID) {
    return parent::select(
      [
        'id',
        'name',
        'quantity',
        'is_active'
      ],
      [
        'zone_id' => $zoneID
      ]
    );
  }
}

?>
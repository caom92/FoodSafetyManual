<?php

namespace fsm\database\gmp\packing\handWash;
require_once realpath(dirname(__FILE__).'/../../../../dao/ToggableItemsTable.php');
use fsm\database as db;


// Interfaz para la tabla gmp_packing_hand_washing_characteristics
class Characteristics extends db\ToggableItemsTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gmp_packing_hand_washing_characteristics
  function __construct() { 
    parent::__construct('gmp_packing_hand_washing_characteristics');
  }

  // Retorna una lista de todos los renglones registradas en la zona con
  // con el ID especificado y que cuyo campo de activacion esta asignado como
  // verdadero
  // [in]   zoneID (uint): el ID de la zona cuyas caracteristicas van a ser 
  //        leidas
  // [out]  return (dictionary): arreglo asociativo que contiene todas las 
  //        caracteristicas registradas en la zona especificada y que esten 
  //        activadas
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

  // Retorna una lista de todos los renglones que tengan registrados el ID de 
  // zona especificado independientemente si su campo de activacion este 
  // asignado como verdadero o falso
  // [in]   zoneID (uint): el ID de la zona cuyas caracteristicas 
  //        queremos leer
  // [out]  return (dictionary): un arreglo asociativo que contiene los datos 
  //        de las caracteristicas registradas en la zona con el ID especificado
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
}

?>
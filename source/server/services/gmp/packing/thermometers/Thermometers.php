<?php

namespace fsm\database\gmp\packing\thermometers;
require_once realpath(dirname(__FILE__).'/../../../../dao/ToggableItemsTable.php');
use fsm\database as db;


// Interfaz para la tabla gmp_packing_thermometers_thermometers
class Thermometers extends db\ToggableItemsTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gmp_packing_thermometers_thermometers
  function __construct() { 
    parent::__construct('gmp_packing_thermometers_thermometers');
  }

  // Retorna una lista de todos los renglones que tengan el ID de zona 
  // especificado y que cuya columna de activacion esta asignada como verdadero
  // [in]   zoneID (uint): el ID de la zona cuyos termometros van a ser leidos
  // [out]  return (dictionary): arreglo asociativo que contiene los datos de 
  //        los termometros registrados en la zona con el ID especificado y que
  //        se encuentren activos organizados en renglones y columnas
  function selectActiveByZoneID($zoneID) {
    return parent::select(
      ['id', 'serial_num(name)'],
      [
        'AND' => [
          'zone_id' => $zoneID,
          'is_active' => TRUE
        ]
      ]
    );
  }

  // Retorna una lista de todos los renglones de la tabla que tengan
  // registrado el ID de zona especificado independientemente del valor
  // que tenga asignado el campo de activacion
  // [in]   zoneID (uint): el ID de la zona cuyos termometros van a ser leidos
  // [out]  return (dictionary): arreglo asociativo que contiene los datos
  //        de los termometros registrados en la zona con el ID especificado
  //        organizados en renglones y columnas
  function selectAllByZoneID($zoneID) {
    return parent::select(
      [
        'id',
        'serial_num(name)',
        'is_active'
      ],
      [
        'zone_id' => $zoneID
      ]
    );
  }
}

?>
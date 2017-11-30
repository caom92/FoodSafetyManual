<?php

namespace fsm\database\gmp\packing\calibration;
require_once realpath(dirname(__FILE__).'/../../../../dao/OrderedItemsTable.php');
use fsm\database as db;


// Interfaz para la tabla gmp_packing_calibration_scales
class Scales extends db\OrderedItemsTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gmp_packing_calibration_scales
  function __construct() { 
    parent::__construct('gmp_packing_calibration_scales');
  }

  // Retorna los datos de las basculas que esten registrados en la zona con el 
  // ID especificado y que su campo de activacion este en verdadero
  // [in]   zoneID (uint): el ID de la zona cuyas basculas vamos a recuperar
  // [out]  return (dictionary): un arreglo asociativo que contiene los datos 
  //        de todas las basculas registradas en la zona especificada 
  //        organizados en renglones y columnas
  function selectActiveByZoneID($zoneID) {
    return parent::select(
      [
        "$this->table.id(id)",
        'type_id(type_id)',
        'st.name(type_name)',
        'serial_num(name)',
        'position(order)'
      ],
      [
        'AND' => [
          'zone_id' => $zoneID,
          'is_active' => TRUE
        ],
        'ORDER' => [
          'type_id',
          'order'
        ]
      ],
      [
        '[><]gmp_packing_calibration_scale_types(st)' => [
          'type_id' => 'id'
        ]
      ]
    );
  }

  // Retorna los datos de las basculas que tengan registrados los IDs de zona
  // y tipo especificados independientemente si su campo de activacion esta 
  // colocado como verdadero o falso
  // [in]   zoneID (uint): el ID de la zona cuyas basculas vamos a recuperar
  // [in]   typeID (uint): el ID del tipo de basculas que van a ser recuperadas
  // [out]  return (dictionary): un arreglo asociativo que contiene los datos 
  //        de todas las basculas registradas en la zona especificada y del tipo
  //        especificado organizados en renglones y columnas
  function selectByZoneAndTypeID($zoneID, $typeID) {
    return parent::select(
      [
        "$this->table.id(id)",
        'is_active',
        'serial_num(name)',
        'position'
      ],
      [
        'AND' => [
          'zone_id' => $zoneID,
          'type_id' => $typeID
        ],
        'ORDER' => [
          'type_id',
          'position'
        ]
      ]
    );
  }

  // Cuenta el numero de basculas que tienen registrados los IDs de zona y tipo
  // especificados
  // [in]   zoneID (uint): el ID de la zona cuyas basculas vamos a recuperar
  // [in]   typeID (uint): el ID del tipo de basculas que van a ser recuperadas
  // [out]  return (uint): el numero de basculas en la tabla registradas en la 
  //        zona especificada y del tipo especificado
  function countByZoneAndTypeIDs($zoneID, $typeID) {
    return parent::count([ 
      'AND' => [
        'zone_id' => $zoneID,
        'type_id' => $typeID 
      ]
    ]);
  }
}

?>
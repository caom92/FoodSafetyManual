<?php

namespace fsm\database\gmp\packing\glass;
require_once realpath(dirname(__FILE__).'/../../../../dao/OrderedItemsTable.php');
use fsm\database as db;


// Interfaz para la tabla gmp_packing_glass_area_glass
class AreaGlass extends db\OrderedItemsTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gmp_packing_glass_area_glass
  function __construct() { 
    parent::__construct('gmp_packing_glass_area_glass');
  }

  // Cuenta la cantidad de renglones que tienen registrados el ID de area 
  // especificado
  // [in]   areaID (uint): el ID del area cuyos objetos de cristal y plastico
  //        fragil van a ser contados
  // [out]  return (uint): el numero de objetos de cristal y plastico fragil 
  //        registrados en el area especificada
  function countByAreaID($areaID) {
    return parent::count(['area_id' => $areaID]);
  }

  // Retorna una lista con todos los renglones que tengan registrado el ID de
  // area especificado
  // [in]   areaID (uint): el ID del area cuyos objetos de cristal y plastico
  //        fragil van a ser leidos
  // [out]  return (dictionary): arreglo asociativo que contiene los datos de
  //        los objetos de cristal y plastico fragil del area especificada 
  //        organizados en renglones y columnas
  function selectByAreaID($areaID) {
    return parent::select(
      [ 
        "$this->table.id",
        'position(order)',
        "$this->table.name",
        'quantity',
        'is_active'
      ],
      [ 
        'area_id' => $areaID,
        'ORDER' => [
          'position'
        ]
      ]
    );
  }

  // Retorna una lista de todos los renglones que tengan registrado el ID de 
  // zona especificado y que cuyo campo de activacion este asignado como 
  // verdadero
  // [in]   zoneID (uint): el ID de la zona cuyos objetos de vidrio y plastico
  //        fragil van a ser leidos
  // [out]  return (dictionary): un arreglo asociativo que contiene los datos de
  //        los objetos de cristal y plastico fragil de la zona especificada
  //        agrupados por areas y organizados en renglones y columnas
  function selectActiveByZoneID($zoneID) {
    return parent::select(
      [
        'a.id(area_id)',
        'a.name(area_name)',
        "$this->table.id(item_id)",
        "position(order)",
        "$this->table.name(item_name)",
        "quantity"
      ],
      [
        'AND' => [
          'a.zone_id' => $zoneID,
          'is_active' => TRUE
        ],
        'ORDER' => [
          'a.id',
          "$this->table.position"
        ]
      ],
      [
        '[><]working_areas(a)' => [
          'area_id' => 'id'
        ]
      ]
    );
  }
}

?>
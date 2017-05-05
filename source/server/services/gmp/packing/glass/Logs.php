<?php

namespace fsm\database\gmp\packing\glass;
require_once realpath(dirname(__FILE__).'/../../../../dao/LogTable.php');
use fsm\database as db;


// Interfaz para la tabla gmp_packing_glass_logs
class Logs extends db\LogTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gmp_packing_glass_logs
  function __construct() { 
    parent::__construct('gmp_packing_glass_logs');
  }

  // Retorna una lista de todos los renglones en la tabla que tengan asignado
  // el ID de la fecha de captura especificado
  // [in]   dateID (int): el ID de la fecha en que los datos fueron capturados
  //        en la base de datos
  // [out]  return (dictionary): un arreglo asociativo que contiene los datos
  //        de la tabla que tengan asignado el ID especificado organizados en
  //        renglones y columnas
  function selectByCaptureDateID($dateID) {
    return parent::select(
      [
        'a.id(area_id)',
        'a.name(area_name)',
        'i.id(item_id)',
        'i.name(item_name)',
        'i.position(item_order)',
        'i.quantity(item_quantity)',
        'is_acceptable(item_status)'
      ],
      [
        'capture_date_id' => $dateID,
        'ORDER' => [
          'a.id', 'i.position'
        ]
      ],
      [
        '[><]gmp_packing_glass_area_glass(i)' => [
          'area_glass_id' => 'id'
        ],
        '[><]working_areas(a)' => [
          'i.area_id' => 'id'
        ]
      ]
    );
  }
}

?>
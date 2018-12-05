<?php

namespace fsm\database\gap\packing\waterResource;
require_once realpath(dirname(__FILE__).'/../../../../dao/LogTable.php');
use fsm\database as db;


// Interfaz para la tabla gap_packing_water_resource_logs
class Logs extends db\LogTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gap_packing_water_resource_logs
  function __construct() { 
    parent::__construct('gap_packing_water_resource_logs');
  }

  function selectByCaptureDateID($dateID) {
    return parent::select(
      [
        'a.id(area_id)',
        'a.name(area_name)',
        'i.id(id)',
        'i.name(name)',
        'i.position(order)',
        'date',
        'is_compliant(compliance)',
        'corrective_actions'
      ],
      [
        'capture_date_id' => $dateID,
        'ORDER' => [
          'a.id', 'i.position'
        ]
      ],
      [
        '[><]gap_packing_water_resource_items(i)' => [
          'item_id' => 'id'
        ],
        '[><]gap_packing_water_resource_areas(a)' => [
          'i.area_id' => 'id'
        ]
      ]
    );
  }

  // Modifica los renglones de la tabla que tienen registrado el ID de fecha de 
  // captura especificado, sustituyendo los viejos datos con los datos
  // especificados
  // [in]   changes (dictionary): arreglo asociativo que contiene los datos que 
  //        van a ser añadidos en la tabla organizados por columnas
  // [in]   logID (uint): el ID de fecha de captura cuyo renglon en la tabla
  //        va a ser modificado
  // [in]   stationID (uint): el ID de la estacion cuyos datos van a ser 
  //        modificados
  // [out]  return (uint): el numero de renglones que fueron modificados
  function updateByCapturedLogIDAndItemID($changes, $logID, $itemID) {
    return parent::update($changes, [
      'AND' => [
        'capture_date_id' => $logID,
        'item_id' => $itemID
      ]
    ]);
  }
}

?>
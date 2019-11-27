<?php

namespace fsm\database\gap\selfInspection\pestControl;
require_once realpath(dirname(__FILE__).'/../../../../dao/LogTable.php');
use fsm\database as db;


// Interfaz para la tabla gap_self_inspection_pest_control_logs
class Logs extends db\LogTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gap_self_inspection_pest_control_logs
  function __construct() { 
    parent::__construct('gap_self_inspection_pest_control_logs');
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
        'r.id(room_id)',
        'r.name(room_name)',
        's.id(id)',
        's.name(name)',
        's.position(order)',
        //'is_secured(secured)',
        'is_condition_acceptable(condition)',
        'has_activity(activity)',
        'corrective_actions'
      ],
      [
        'capture_date_id' => $dateID,
        'ORDER' => [
          'r.id', 's.position'
        ]
      ],
      [
        '[><]gap_self_inspection_pest_control_stations(s)' => [
          'station_id' => 'id'
        ],
        '[><]gap_self_inspection_pest_control_rooms(r)' => [
          's.room_id' => 'id'
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
  function updateByCapturedLogIDAndStationID($changes, $logID, $stationID) {
    return parent::update($changes, [
      'AND' => [
        'capture_date_id' => $logID,
        'station_id' => $stationID
      ]
    ]);
  }
}

?>
<?php

namespace fsm\database\gmp\pestControl\selfInspection;
require_once realpath(dirname(__FILE__).'/../../../../dao/LogTable.php');
use fsm\database as db;


// Interfaz para la tabla gmp_pest_control_self_inspection_logs
class Logs extends db\LogTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gmp_pest_control_self_inspection_logs
  function __construct() { 
    parent::__construct('gmp_pest_control_self_inspection_logs');
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
        'is_secured(secured)',
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
        '[><]gmp_pest_control_self_inspection_stations(s)' => [
          'station_id' => 'id'
        ],
        '[><]gmp_pest_control_self_inspection_rooms(r)' => [
          's.room_id' => 'id'
        ]
      ]
    );
  }
}

?>
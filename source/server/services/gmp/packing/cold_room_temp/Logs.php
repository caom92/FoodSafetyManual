<?php

namespace fsm\database\gmp\packing\coldRoomTemp;
require_once realpath(dirname(__FILE__).'/../../../../dao/LogTable.php');
use fsm\database as db;


// Interfaz para la tabla gmp_packing_cold_room_temp_logs
class Logs extends db\LogTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gmp_packing_cold_room_temp_logs
  function __construct() { 
    parent::__construct('gmp_packing_cold_room_temp_logs');
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
        'r.id(id)',
        'r.name(name)',
        'test',
        'deficiencies',
        'corrective_actions(corrective_action)'
      ],
      [
        'capture_date_id' => $dateID
      ],
      [
        '[><]gmp_packing_cold_room_temp_rooms(r)' => [
          'room_id' => 'id'
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
  // [in]   roomID (uint): el ID del cuarto frio cuyos datos van a ser 
  //        modificados
  // [out]  return (uint): el numero de renglones que fueron modificados
  function updateByCapturedLogIDAndRoomID($changes, $logID, 
    $roomID) {
    return parent::update($changes, [
      'AND' => [
        'capture_date_id' => $logID,
        'room_id' => $roomID
      ]
    ]);
  }
}

?>
<?php

namespace fsm\database\gmp\packing\atp;
require_once realpath(dirname(__FILE__).'/../../../../dao/LogTable.php');
use fsm\database as db;


// Interfaz para la tabla gmp_packing_atp_time_logs
class TimeLogs extends db\LogTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gmp_packing_atp_time_logs
  function __construct() { 
    parent::__construct('gmp_packing_atp_time_logs');
  }

  // Retorna una lista de todos los renglones en la tabla que tengan asignado
  // el ID de la fecha de captura especificado
  // [in]   dateID (int): el ID de la fecha en que los datos fueron capturados
  //        en la base de datos
  // [out]  return (dictionary): un arreglo asociativo que contiene los datos
  //        de la tabla que tengan asignado el ID especificado organizados en
  //        renglones y columnas
  function selectByCaptureDateID($dateID) {
    return parent::$dataBase->query(
      "SELECT
        $this->table.id AS time_log_id,
        a.id AS area_id,
        a.name AS area_name,
        DATE_FORMAT(time, '%H:%i') AS time
      FROM $this->table
      INNER JOIN gmp_packing_atp_check_areas AS a
        ON $this->table.area_id = a.id
      WHERE capture_date_id = $dateID"
    )->fetchAll();
  }

  // Actualiza los datos almacenados en el renglon con el ID de fecha de 
  // captura especificado
  // [in]   newData (dictionary): los datos que van a ser ingresados en la BD
  // [in]   logID (uint): el ID de la fecha de captura cuyos datos van a ser
  //        modificados
  // [out]  return (int): el numero de renglones que fueron modificados
  function updateByCapturedLogID($newData, $logID) {
    return parent::update($newData, [
      'capture_date_id' => $logID
    ]);
  }
}

?>
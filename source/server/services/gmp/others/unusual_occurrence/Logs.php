<?php

namespace fsm\database\gmp\others\unusualOccurrence;
require_once realpath(dirname(__FILE__).'/../../../../dao/LogTable.php');
use fsm\database as db;


// Interfaz para la tabla gmp_packing_unusual_occurrence_logs
class Logs extends db\LogTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gmp_packing_unusual_occurrence_logs
  function __construct() { 
    parent::__construct('gmp_others_unusual_occurrence_logs');
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
        incident_date,
        DATE_FORMAT(time, '%H:%i') AS time,
        s.name AS shift,
        s.id AS shift_id,
        production_area_id AS area,
        product_id AS product_name,
        batch,
        description,
        corrective_action,
        album_url
      FROM $this->table
      INNER JOIN shifts AS s
        ON $this->table.shift_id = s.id
      WHERE capture_date_id = $dateID"
    )->fetchAll();
  }

  // Modifica los renglones de la tabla que tienen registrado el ID de fecha de 
  // captura especificado, sustituyendo los viejos datos con los datos
  // especificados
  // [in]   changes (dictionary): arreglo asociativo que contiene los datos que 
  //        van a ser añadidos en la tabla organizados por columnas
  // [in]   logID (uint): el ID de fecha de captura cuyo renglon en la tabla
  //        va a ser modificado
  // [out]  return (uint): el numero de renglones que fueron modificados
  function updateByCapturedLogID($changes, $logID) {
    return parent::update($changes, ['capture_date_id' => $logID]);
  }
}

?>
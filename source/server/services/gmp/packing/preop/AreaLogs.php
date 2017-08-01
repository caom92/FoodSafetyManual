<?php

namespace fsm\database\gmp\packing\preop;
require_once realpath(dirname(__FILE__).'/../../../../dao/LogTable.php');
use fsm\database as db;


// Interfaz para la tabla gmp_packing_preop_areas_log
class AreaLogs extends db\LogTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gmp_packing_preop_areas_log
  function __construct() { 
    parent::__construct('gmp_packing_preop_areas_log');
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
        id, 
        capture_date_id, 
        DATE_FORMAT(time, '%H:%i') AS time, 
        notes, 
        person_performing_sanitation
      FROM
        $this->table
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
  // [in]   areaID (uint): el ID del area cuyo renglon queremos actualizar 
  // [out]  return (uint): el numero de renglones que fueron modificados
  function updateByCapturedLogIDAndAreaID($changes, $logID, $areaID) {
      return parent::update($changes, [
        'AND' => [
          'capture_date_id' => $logID,
          'area_id' => $areaID
        ]
      ]);
  }
}

?>
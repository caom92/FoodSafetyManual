<?php

namespace fsm\database\gmp\packing\calibration;
require_once realpath(dirname(__FILE__).'/../../../../dao/LogTable.php');
use fsm\database as db;


// Interfaz para la tabla gmp_packing_calibration_time_logs
class TimeLogs extends db\LogTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gmp_packing_calibration_time_logs
  function __construct() { 
    parent::__construct('gmp_packing_calibration_time_logs');
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
        DATE_FORMAT(time, '%H:%i') AS time,
        s.type_id AS type_id,
        st.name AS type_name,
        s.position AS `order`,
        s.serial_num AS scale_name,
        sl.test AS test,
        sl.was_test_passed AS status,
        sl.was_scale_sanitized AS is_sanitized
      FROM $this->table
      INNER JOIN gmp_packing_calibration_scale_logs AS sl
        ON $this->table.id = sl.time_log_id
      INNER JOIN gmp_packing_calibration_scales AS s
        ON sl.scale_id = s.id
      INNER JOIN gmp_packing_calibration_scale_types AS st
        ON s.type_id = st.id
      WHERE capture_date_id = $logID
      ORDER BY type_id, scale_name"
    )->fetchAll();
  }
}

?>
<?php

namespace fsm\database\gmp\packing\calibration;
require_once realpath(dirname(__FILE__).'/../../../../dao/InsertableTable.php');
use fsm\database as db;


// Interfaz para la tabla gmp_packing_calibration_scale_logs
class ScaleLogs extends db\InsertableTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gmp_packing_calibration_scale_logs
  function __construct() { 
    parent::__construct('gmp_packing_calibration_scale_logs');
  }

  // Modifica los renglones de la tabla que tienen registrado el ID de fecha de 
  // captura especificado, sustituyendo los viejos datos con los datos
  // especificados
  // [in]   changes (dictionary): arreglo asociativo que contiene los datos que 
  //        van a ser añadidos en la tabla organizados por columnas
  // [in]   logID (uint): el ID de fecha de captura cuyo renglon en la tabla
  //        va a ser modificado
  // [in]   scaleID (uint): el ID de la bascula cuyos datos van a ser 
  //        modificados
  // [out]  return (uint): el numero de renglones que fueron modificados
  function updateByCapturedLogIDAndScaleID($changes, $logID, $scaleID) {
    $unit_id = is_null($changes['unit_id']) ? "NULL" : $changes['unit_id'];
    $quantity = is_null($changes['quantity']) ? "NULL" : $changes['quantity'];
    $wasTestPassed = ($changes['was_test_passed']) ? "1" : "0";
    $wasScaleSanitized = ($changes['was_scale_sanitized']) ? "1" : "0";
    return parent::$dataBase->query(
      "UPDATE 
        $this->table
      INNER JOIN gmp_packing_calibration_time_logs AS tl
        ON time_log_id = tl.id
      INNER JOIN captured_logs AS cl
        ON tl.capture_date_id = cl.id
      SET 
        test = {$changes['test']},
        unit_id = {$unit_id},
        quantity = {$quantity},
        was_test_passed = {$wasTestPassed},
        was_scale_sanitized = {$wasScaleSanitized}
      WHERE cl.id = $logID AND scale_id = $scaleID"
    );
  }
}

?>
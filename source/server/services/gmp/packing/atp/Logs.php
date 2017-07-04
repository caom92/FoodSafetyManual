<?php

namespace fsm\database\gmp\packing\atp;
require_once realpath(dirname(__FILE__).'/../../../../dao/InsertableTable.php');
use fsm\database as db;


// Interfaz para la tabla gmp_packing_atp_logs
class Logs extends db\InsertableTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gmp_packing_atp_logs
  function __construct() { 
    parent::__construct('gmp_packing_atp_logs');
  }

  // Retorna una lista de todos los renglones que tengan registrados el ID
  // de bitacora de tiempos de captura especificado
  // [in]   timeLogID (uint): el ID de un renglon de la tabla de bitacora 
  //        de tiempos de captura cuyos datos vamos a buscar en esta tabla
  // [out]  return (dictionary): los datos leidos de la tabla organizados en
  //        renglones y columnas
  function selectByTimeLogID($timeLogID) {
    return parent::select(
      [
        'id',
        'test_num(test_number)',
        'test1',
        'was_test1_passed(results1)',
        'corrective_action',
        'test2',
        'was_test2_passed(results2)'
      ],
      [
        'time_log_id' => $timeLogID
      ]
    );
  }

  // Modifica los renglones de la tabla que tienen registrado el ID de fecha de 
  // captura especificado, sustituyendo los viejos datos con los datos
  // especificados
  // [in]   testNum (uint): el numero de medicion realizado sobre el objeto
  // [in]   changes (dictionary): arreglo asociativo que contiene los datos que 
  //        van a ser añadidos en la tabla organizados por columnas
  // [in]   logID (uint): el ID de fecha de captura cuyo renglon en la tabla
  //        va a ser modificado
  // [in]   area (string): el nombre del area cuyos datos van a ser modificados
  // [out]  return (uint): el numero de renglones que fueron modificados
  function updateByCapturedLogIDAndArea($testNum, $changes, $logID, $area) {
    $test1 = ($changes['was_test1_passed']) ? '1' : '0';
    $test2 = ($changes['was_test2_passed']) ? '1' : '0';

    return parent::$dataBase->query(
      "UPDATE 
        $this->table
      INNER JOIN gmp_packing_atp_time_logs AS tl
        ON time_log_id = tl.id
      INNER JOIN captured_logs AS cl
        ON tl.capture_date_id = cl.id
      SET 
        test1 = {$changes['test1']},
        was_test1_passed = {$test1},
        corrective_action = '{$changes['corrective_action']}',
        test2 = {$changes['test2']},
        was_test2_passed = {$test2}
      WHERE cl.id = $logID AND tl.area = '$area' AND test_num = $testNum"
    );
  }
}

?>
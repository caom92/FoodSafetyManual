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
}

?>
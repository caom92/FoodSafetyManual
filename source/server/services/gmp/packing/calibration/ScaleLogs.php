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

}

?>
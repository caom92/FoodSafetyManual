<?php

namespace fsm\database\gmp\packing\calibration;
require_once realpath(dirname(__FILE__).'/../../../../dao/DataBaseTable.php');
use fsm\database as db;


// Interfaz para la tabla gmp_packing_calibration_scale_types
class ScaleTypes extends db\DataBaseTable{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gmp_packing_calibration_scale_types
  function __construct() { 
    parent::__construct('gmp_packing_calibration_scale_types');
  }

  // Retorna un arreglo asociativo que contiene todos los datos de la 
  // tabla organizados en renglones y columnas
  function selectAll() {
    return parent::select('*');
  }
}

?>
<?php

namespace fsm\database\gmp\packing\calibration;
require_once realpath(dirname(__FILE__)
  .'/../../../../dao/DataBaseTable.php');
use fsm\database as db;


// Interfaz para la tabla gmp_packing_calibration_weight_units
class WeightUnits extends db\DataBaseTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gmp_packing_calibration_weight_units
  function __construct() { 
    parent::__construct('gmp_packing_calibration_weight_units');
  }

  // Retorna todos los renglones de la tabla organizados en un arreglo
  // asociativo organizado en renglones y columnas
  function selectAll() {
    return parent::select('*');
  }
}

?>
<?php

namespace fsm\database\gmp\packing\agedProduct;
require_once realpath(dirname(__FILE__).'/../../../../dao/DataBaseTable.php');
use fsm\database as db;

// Interfaz para la tabla gmp_packing_qc_aged_actions
class Actions extends db\DataBaseTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gmp_packing_qc_aged_actions
  function __construct() { 
    parent::__construct('gmp_packing_qc_aged_actions');
  }

  // Retorna todos los elementos de la tabla organizados en renglones y columnas
  function selectAll() {
    return parent::select('*');
  }
}

?>
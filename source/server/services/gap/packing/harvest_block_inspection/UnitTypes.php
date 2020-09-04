<?php

namespace fsm\database\gap\packing\harvestBlockInspection;
require_once realpath(dirname(__FILE__).'/../../../../dao/DataBaseTable.php');
use fsm\database as db;

// Interfaz para la tabla gap_packing_harvest_block_inspection_unit_types
class UnitTypes extends db\DataBaseTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gap_packing_harvest_block_inspection_unit_types
  function __construct() { 
    parent::__construct('gap_packing_harvest_block_inspection_unit_types');
  }

  // Returns an associative which contains the list of quality types
  function selectAll() {
    return parent::select('*');
  }
}

?>
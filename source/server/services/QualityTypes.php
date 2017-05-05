<?php

namespace fsm\database;
require_once realpath(dirname(__FILE__).'/../dao/DataBaseTable.php');
use fsm\database as db;


// Interfaz para la tabla quality_types
class QualityTypes extends db\DataBaseTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla quality_types
  function __construct() { 
    parent::__construct('quality_types');
  }

  // Returns an associative which contains the list of quality types
  function selectAll() {
    return parent::select('*');
  }
}

?>
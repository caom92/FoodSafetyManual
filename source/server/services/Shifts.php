<?php

namespace fsm\database;
require_once realpath(dirname(__FILE__).'/../dao/DataBaseTable.php');
use fsm\database as db;


// Interfaz para la tabla shifts
class Shifts extends db\DataBaseTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla shifts
  function __construct() { 
    parent::__construct('shifts');
  }

  // Returns an associative array with the info of every shift
  // stored in the data base
  function selectAll() {
    return parent::select('*');
  }
}

?>
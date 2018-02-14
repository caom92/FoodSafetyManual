<?php

namespace fsm\database;
require_once realpath(dirname(__FILE__).'/../../dao/DataBaseTable.php');
use fsm\database as db;


// Interfaz para la tabla modules
class Modules extends db\DataBaseTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla modules
  function __construct() { 
    parent::__construct('modules');
  }

  // Returns an associative array containing the data of the modules that 
  // belong to the program with the especified ID
  // [in]     programID: the ID of the program which programs is going to
  //          be retrieve
  // [out]    return: an associative array if the especified program has
  //          any modules or NULL otherwise
  function selectByProgramID($programID) {
    return parent::select(['id', 'name'], ['program_id' => $programID]);
  }
}

?>
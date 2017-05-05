<?php

namespace fsm\database;
require_once realpath(dirname(__FILE__).'/../../dao/DataBaseTable.php');
use fsm\database as db;


// Interfaz para la tabla programs
class Programs extends db\DataBaseTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla programs
  function __construct() { 
    parent::__construct('programs');
  }

  // Returns an associative array containing all the data elements
  // of the table
  // [out]    return: an associative array with the data contained in
  //          the data base table
  function selectAll() {
    return parent::select("*");
  }
}

?>
<?php

namespace fsm\database;
require_once realpath(dirname(__FILE__).'/../../dao/DataBaseTable.php');
use fsm\database as db;


// Interfaz para la tabla privileges
class Privileges extends db\DataBaseTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla privileges
  function __construct() { 
    parent::__construct('privileges');
  }

  // Returns an associative array with the info of every privilege
  // stored in the data base
  function selectAll() {
    return parent::select('*');
  }

  // Returns the ID of the privilege with the specified name
  function getIDByName($name) {
    return parent::get('id', ['name' => $name]);
  }
}

?>
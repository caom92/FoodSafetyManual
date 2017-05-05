<?php

namespace fsm\database;
require_once realpath(dirname(__FILE__).'/../dao/DataBaseTable.php');
use fsm\database as db;


// Interfaz para la tabla roles
class Roles extends db\DataBaseTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla roles
  function __construct() { 
    parent::__construct('roles');
  }

  // Returns an associative array with the info of every privilege
  // stored in the data base
  function selectAll() {
    return parent::select('*');
  }

  // Returns the name of the role that has the specified ID
  function getNameByID($id) {
    return parent::get('name', ['id' => $id]);
  }
}

?>
<?php

namespace fsm\database;
require_once realpath(dirname(__FILE__).'/../../dao/InsertableTable.php');
use fsm\database as db;


// Interfaz para la tabla contact_info
class ContactInfo extends db\InsertableTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla contact_info
  function __construct() { 
    parent::__construct('contact_info');
  }

}

?>
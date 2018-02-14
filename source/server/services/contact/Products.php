<?php

namespace fsm\database;
require_once realpath(dirname(__FILE__).'/../../dao/ToggableItemsTable.php');
use fsm\database as db;


// Interfaz para la tabla products
class Products extends db\ToggableItemsTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla products
  function __construct() { 
    parent::__construct('products');
  }

  // Returns an associative which contains the list all the registered 
  // products
  function selectCode() {
    return parent::select(['id', 'code']);
  }

  // Returns a list of all products registered
  function selectAll() {
    return parent::select('*');
  }
}

?>
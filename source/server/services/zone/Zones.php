<?php

namespace fsm\database;
require_once realpath(dirname(__FILE__).'/../../dao/InsertableTable.php');
use fsm\database as db;


// Interfaz para la tabla zones
class Zones extends db\InsertableTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla zones
  function __construct() { 
    parent::__construct('zones');
  }

  // Returns the data of the zone with the given id if it exists in 
  // the data base or NULL otherwise
  function getByID($zoneID) {
    return parent::get('*', [ 'id' => $zoneID ]);
  }

  // Returns an associative array containing all the data elements
  // of the table
  // [out]    return: an associative array with the data contained in
  //          the data base table
  function selectAll() {
    return parent::select("*", [ 'ORDER' => 'id' ]);
  }

  // Searches a zone with the given name and returns its data if it 
  // found it or NULL otherwise
  function hasByName($zoneName) {
    return parent::has([
      'name' => $zoneName
    ]);
  }
}

?>
<?php

namespace fsm\database\gap\packing\preop;
require_once realpath(dirname(__FILE__)
  .'/../../../../dao/ToggableItemsTable.php');
use fsm\database as db;


// Interfaz para la tabla working_areas
class WorkingAreas extends db\ToggableItemsTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla working_areas
  function __construct() { 
    parent::__construct('gap_packing_preop_working_areas');
  }

  // Returns an associative array containing the information of all the 
  // working areas that are related to the specified zone
  // [in]     zoneID: the ID of the zone whose areas are going to be
  //          retrieved
  function selectByZoneID($zoneID) {
    return parent::select(
      [ "$this->table.id", 'name' ],
      [ 'zone_id' => $zoneID ]
    );
  }
}

?>
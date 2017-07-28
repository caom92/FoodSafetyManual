<?php

namespace fsm\database\gmp\packing\preop;
require_once realpath(dirname(__FILE__).'/../../../../dao/InsertableTable.php');
use fsm\database as db;


// Interfaz para la tabla working_areas
class WorkingAreas extends db\OrderedItemsTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla working_areas
  function __construct() { 
    parent::__construct('gmp_packing_preop_working_areas');
  }

  // Returns an associative array containing the information of all the 
  // working areas that are related to the specified zone
  // [in]     zoneID: the ID of the zone whose areas are going to be
  //          retrieved
  function selectByZoneID($zoneID) {
    return parent::select(
      [ "$this->table.id", 'position', 'name' ],
      [ 
        'zone_id' => $zoneID,
        'ORDER' => [
          "$this->table.position"
        ]
      ]
    );
  }

  // Searches an area with the given name and returns its data if it 
  // found it or NULL otherwise
  function hasByName($areaName) {
    return parent::has([
      'name' => $areaName
    ]);
  }

  // Returns the number of rows that have the especified zone ID
  function countByZoneID($zoneID) {
    return parent::count(['zone_id' => $zoneID]);
  }
}

?>
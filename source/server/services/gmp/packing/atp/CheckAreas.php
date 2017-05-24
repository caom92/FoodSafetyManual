<?php

namespace fsm\database\gmp\packing\atp;
require_once realpath(dirname(__FILE__).'/../../../../dao/InsertableTable.php');
use fsm\database as db;


// Interfaz para la tabla gmp_packing_atp_check_areas
class CheckAreas extends db\InsertableTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gmp_packing_atp_check_areas
  function __construct() { 
    parent::__construct('gmp_packing_atp_check_areas');
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
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

  // Returns the ID of the area with the especified name and zone ID
  // [in]   name: the name of the area which id will be searched for
  // [in]   zoneID: the id of the zone which the area should be looked in
  // [out]  return: the id of the area if this was found or null if this was
  //        not the case
  function selectIDByNameAndZoneID($name, $zoneID) {
    $rows = parent::select(
      'id', [ 'AND' => [
        'name' => $name,
        'zone_id' => $zoneID
      ]]
    );

    return (count($rows) > 0) ? $rows[0] : NULL;
  }
}

?>
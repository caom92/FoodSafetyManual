<?php

namespace fsm\database\gmp\packing\ozone;
require_once realpath(dirname(__FILE__).'/../../../../dao/OrderedItemsTable.php');
use fsm\database as db;


// Interfaz para la tabla gmp_packing_ozone_water_machines
class Machines extends db\OrderedItemsTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gmp_packing_ozone_water_machines
  function __construct() { 
    parent::__construct('gmp_packing_ozone_water_machines');
  }

  function selectActiveByZoneID($zoneID) {
    return parent::select(
      [ 'id', 'name', 'position' ],
      [
        'AND' => [
          'zone_id' => $zoneID,
          'is_active' => TRUE
        ],
        'ORDER' => [
          'position'
        ]
      ]
    );
  }

  function selectAllByZoneID($zoneID) {
    return parent::select(
      [
        'id',
        'name',
        'is_active',
        'position'
      ],
      [
        'zone_id' => $zoneID,
        'ORDER' => [
          'position'
        ]
      ]
    );
  }

  function countByZoneID($zoneID) {
    return parent::count([ 'zone_id' => $zoneID]);
  }
}

?>
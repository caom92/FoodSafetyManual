<?php

namespace fsm\database\gap\packing\waterResource;
require_once realpath(dirname(__FILE__).'/../../../../dao/OrderedItemsTable.php');
use fsm\database as db;


// Interfaz para la tabla gap_packing_water_resource_areas
class Areas extends db\OrderedItemsTable
{
  function __construct() { 
    parent::__construct('gap_packing_water_resource_areas');
  }

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

  function selectByZoneIDOrderedByName($zoneID) {
    return parent::select(
      [ "$this->table.id", 'position', 'name' ],
      [ 
        'zone_id' => $zoneID,
        'ORDER' => [
          'name'
        ]
      ]
    );
  }

  function hasByNameAndZoneID($areaName, $zoneID) {
    return parent::has([
      'AND' => [
        'name' => $areaName,
        'zone_id' => $zoneID
      ]
    ]);
  }

  function countByZoneID($zoneID) {
    return parent::count(['zone_id' => $zoneID]);
  }

  function updateNameByID($areaID, $name) {
    return parent::update(
      [ 'name' => $name ],
      [ 'id' => $areaID ]
    );
  }
}

?>
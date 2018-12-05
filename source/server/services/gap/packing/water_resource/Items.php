<?php

namespace fsm\database\gap\packing\waterResource;
require_once realpath(dirname(__FILE__).'/../../../../dao/OrderedItemsTable.php');
use fsm\database as db;


// Interfaz para la tabla items
class Items extends db\OrderedItemsTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla items
  function __construct() { 
    parent::__construct('gap_packing_water_resource_items');
  }

  // Returns the number of items associated to the specified working area
  function countByAreaID($areaID) {
    return parent::count([ 
      'AND' => [
        'area_id' => $areaID
      ]
    ]);
  }

  function selectByAreaID($areaID) {
    return parent::select(
      [
        'id', 'name', 'position', 'is_active'
      ],
      [
        'area_id' => $areaID,
        'ORDER' => [
          'position'
        ]
      ]
    );
  }

  // Returns an associative which contains a list of items within the 
  // working areas of the specified zone grouped by area and item type
  function selectActiveByZoneID($zoneID) {
    return parent::select(
      [
        'a.id(area_id)',
        'a.name(area_name)',
        "$this->table.id(id)",
        "$this->table.name(name)"
      ],
      [
        'AND' => [
          'a.zone_id' => $zoneID,
          "$this->table.is_active" => TRUE
        ],
        'ORDER' => [
          'a.position',
          "$this->table.position"
        ]
      ],
      [
        '[><]gap_packing_water_resource_areas(a)' => ['area_id' => 'id']
      ]
    );
  }
}

?>
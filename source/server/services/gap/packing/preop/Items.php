<?php

namespace fsm\database\gap\packing\preop;
require_once realpath(dirname(__FILE__).'/../../../../dao/OrderedItemsTable.php');
use fsm\database as db;


// Interfaz para la tabla items
class Items extends db\OrderedItemsTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla items
  function __construct() { 
    parent::__construct('gap_packing_preop_items');
  }

  // Returns the number of items associated to the specified working area
  function countByAreaAndTypeIDs($areaID, $typeID) {
    return parent::count([ 
      'AND' => [
        'area_id' => $areaID,
        'type_id' => $typeID 
      ]
    ]);
  }

  // Returns an associative which contains a list of items within the 
  // working areas of the specified zone grouped by area and item type
  function selectByZoneID($zoneID) {
    return parent::select(
      [
        'a.id(area_id)',
        'a.name(area_name)',
        't.id(type_id)',
        't.en_name(type_name_en)',
        't.es_name(type_name_es)',
        "$this->table.id(item_id)",
        "$this->table.name(item_name)",
        "$this->table.position(item_order)"
      ],
      [
        'AND' => [
          'a.zone_id' => $zoneID,
          "$this->table.is_active" => TRUE
        ],
        'ORDER' => [
          'a.position',
          't.id',
          "$this->table.position"
        ]
      ],
      [
        '[><]gap_packing_preop_working_areas(a)' => ['area_id' => 'id'],
        '[><]gap_packing_preop_item_types(t)' => ['type_id' => 'id']
      ]
    );
  }
}

?>
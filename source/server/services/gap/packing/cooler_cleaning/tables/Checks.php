<?php

namespace fsm\database\gap\packing\coolerCleaning;
require_once realpath(dirname(__FILE__).'/../../../../../dao/OrderedItemsTable.php');
use fsm\database as db;

class Checks extends db\OrderedItemsTable
{
  function __construct() { 
    parent::__construct('gap_packing_cooler_cleaning_checks');
  }

  function countByZoneID($zoneID) {
    return parent::count(['zone_id' => $zoneID]);
  }

  function countByAreaAndTypeIDs($areaID, $typeID) {
    return parent::count([ 
      'AND' => [
        'area_id' => $areaID,
        'type_id' => $typeID 
      ]
    ]);
  }

  function hasByNameAndZoneID($name, $zoneID) {
    return parent::has([
      'AND' => [
        'name' => $name,
        'zone_id' => $zoneID
      ]
    ]);
  }

  function selectByZoneID($zoneID) {
    return parent::select(
      [
        'a.id(area_id)',
        'a.name(area_name)',
        't.id(type_id)',
        't.name(type_name)',
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
        '[><]gap_packing_cooler_cleaning_areas(a)' => ['area_id' => 'id'],
        '[><]gap_packing_cooler_cleaning_types(t)' => ['type_id' => 'id']
      ]
    );
  }

  function selectActiveByZoneID($zoneID) {
    return parent::select(
      [
        'id',
        'name'
      ],
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
}

?>

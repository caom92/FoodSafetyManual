<?php

namespace fsm\database\gap\packing\pestControlInspectionFlytrap;
require_once realpath(dirname(__FILE__).'/../../../../dao/OrderedItemsTable.php');
use fsm\database as db;

class EquipmentStatus extends db\OrderedItemsTable
{
  function __construct() { 
    parent::__construct('gap_packing_pest_control_inspection_flytrap_equipment_status');
  }

  function countByZoneID($zoneID) {
    return parent::count(['zone_id' => $zoneID]);
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
    return parent::select('*', [ 'zone_id' => $zoneID, 'ORDER' => [ "$this->table.position" ]]);
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
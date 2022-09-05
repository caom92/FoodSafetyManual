<?php

namespace fsm\database\gmp\packing\pestControlInspectionInterior;
require_once realpath(dirname(__FILE__).'/../../../../dao/OrderedItemsTable.php');
use fsm\database as db;

class PestTypes extends db\OrderedItemsTable
{
  function __construct() { 
    parent::__construct('gmp_packing_pest_control_inspection_interior_pest_types');
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
<?php

namespace fsm\database\gmp\packing\atpLuminometer;
require_once realpath(dirname(__FILE__).'/../../../../dao/OrderedItemsTable.php');
use fsm\database as db;

class Items extends db\OrderedItemsTable
{
  function __construct() { 
    parent::__construct('gmp_packing_atp_luminometer_items');
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
<?php

namespace fsm\database\gmp\packing\atpLuminometer;
require_once realpath(dirname(__FILE__).'/../../../../dao/InsertableTable.php');
use fsm\database as db;

class ItemLogs extends db\InsertableTable
{
  function __construct() { 
    parent::__construct('gmp_packing_atp_luminometer_item_logs');
  }

  function selectByCaptureDateID($dateID) {
    return parent::select(
      [
        'a.id(id)',
        'a.name(name)',
        "$this->table.id(item_log_id)"
      ],
      [
        'capture_date_id' => $dateID,
        'ORDER' => [
          'a.position'
        ]
      ],
      [
        '[><]gmp_packing_atp_luminometer_items(a)' => [
          'item_id' => 'id'
        ]
      ]
    );
  }

  function selectIDByCaptureDateIDAndItemID($dateID, $itemID) {
    return parent::select(
      [
        "$this->table.id(id)",
      ],
      [
        'AND' => [
          'capture_date_id' => $dateID,
          'item_id' => $itemID
        ]
      ]
    )[0]['id'];
  }
}
<?php

namespace fsm\database\gap\packing\bathroomCleaning;
require_once realpath(dirname(__FILE__).'/../../../../dao/InsertableTable.php');
use fsm\database as db;

class ItemLogs extends db\InsertableTable
{
  function __construct() { 
    parent::__construct('gap_packing_bathroom_cleaning_item_logs');
  }

  // Select by date log ID on DateLogs.php
  function selectByDateLogID($dateLogID){
    return parent::select(
      [
        "$this->table.id",
        'item_id',
        'i.name(name)',
        'status',
        'activity'
      ],
      [
        'date_log_id' => $dateLogID
      ],
      [
        '[><]gap_packing_bathroom_cleaning_items(i)' => [
          'item_id' => 'id'
        ]
      ]
    );
  }

  function updateByDateIDAndToolID($changes, $dateID, $toolID) {
    return parent::update($changes, [
      'AND' => [
        'date_log_id' => $dateID,
        'item_id' => $toolID
      ]
    ]);
  }

  function delete($where) {
    return parent::delete($where);
  }
}

?>
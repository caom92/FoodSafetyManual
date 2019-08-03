<?php

namespace fsm\database\gap\packing\harvestTool;
require_once realpath(dirname(__FILE__).'/../../../../dao/LogTable.php');
use fsm\database as db;

class DateLogs extends db\LogTable
{
  function __construct() { 
    parent::__construct('gap_packing_harvest_tool_date_logs');
  }

  function selectByCaptureDateID($dateID) {
    return parent::select(
      [
        'id',
        'date',
        'day_num'
      ],
      [
        'capture_date_id' => $dateID,
      ]
    );
  }

  function hasByCaptureDateIDAndDay($dateID, $dayNumber) {
    return parent::has([
      'AND' => [
        'capture_date_id' => $dateID,
        'day_num' => $dayNumber
      ]
    ]);
  }

  function selectHigherDayByCaptureDateID($dateID, $dayNumber) {
    return parent::select(
      [
        'id'
      ],
      [
        'AND' => [
          'capture_date_id' => $dateID,
          'day_num[>]' => $dayNumber
        ]
      ]
    );
  }

  function selectIDByCaptureDateIDAndDay($dateID, $dayNumber) {
    return parent::select(
      [
        "$this->table.id(id)",
      ],
      [
        'AND' => [
          'capture_date_id' => $dateID,
          'day_num' => $dayNumber
        ]
      ]
    )[0]['id'];
  }

  function updateByCapturedLogIDAndDay($changes, $dateID, $dayNumber) {
    return parent::update($changes, [
      'AND' => [
        'capture_date_id' => $dateID,
        'day_num' => $dayNumber
      ]
    ]);
  }

  function delete($where) {
    return parent::delete($where);
  }
}

?>
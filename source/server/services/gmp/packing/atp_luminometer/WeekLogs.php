<?php

namespace fsm\database\gmp\packing\atpLuminometer;
require_once realpath(dirname(__FILE__).'/../../../../dao/InsertableTable.php');
use fsm\database as db;

class WeekLogs extends db\InsertableTable
{
  function __construct() { 
    parent::__construct('gmp_packing_atp_luminometer_week_logs');
  }

  function selectByItemLogID($itemLogID) {
    return parent::select(
      [
        "$this->table.id(id)",
        'week_num',
        'date'
      ],
      [
        'item_log_id' => $itemLogID,
      ]
    );
  }

  function selectHigherWeekByItemLogID($itemLogID, $weekNumber) {
    return parent::select(
      [
        "$this->table.id(id)"
      ],
      [
        'AND' => [
          'item_log_id' => $itemLogID,
          'week_num[>]' => $weekNumber
        ]
      ]
    );
  }

  function selectIDByItemLogIDAndWeek($itemLogID, $weekNumber) {
    return parent::select(
      [
        "$this->table.id(id)",
      ],
      [
        'AND' => [
          'item_log_id' => $itemLogID,
          'week_num' => $weekNumber
        ]
      ]
    )[0]['id'];
  }

  function hasByItemLogIDAndWeek($itemLogID, $weekNumber) {
    return parent::has([
      'AND' => [
        'item_log_id' => $itemLogID,
        'week_num' => $weekNumber
      ]
    ]);
  }

  function updateByItemLogIDAndWeek($changes, $itemLogID, $weekNumber) {
    return parent::update($changes, [
      'AND' => [
        'item_log_id' => $itemLogID,
        'week_num' => $weekNumber
      ]
    ]);
  }

  function delete($where) {
    return parent::delete($where);
  }
}
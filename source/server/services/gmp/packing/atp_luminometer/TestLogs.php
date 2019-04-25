<?php

namespace fsm\database\gmp\packing\atpLuminometer;
require_once realpath(dirname(__FILE__).'/../../../../dao/InsertableTable.php');
use fsm\database as db;

class TestLogs extends db\InsertableTable
{
  function __construct() { 
    parent::__construct('gmp_packing_atp_luminometer_test_logs');
  }

  function selectByTypeIDAndWeekID($typeID, $weekID) {
    return parent::select(
      [
        'id',
        'test_num',
        'reading',
        'notes'
      ],
      [
        'AND' => [
          'type_id' => $typeID,
          'week_log_id' => $weekID
        ]
      ]
    );
  }

  function updateByTypeIDAndWeekIDAndTest($changes, $typeID, $weekID, $testNumber) {
    return parent::update($changes, [
      'AND' => [
        'type_id' => $typeID,
        'week_log_id' => $weekID,
        'test_num' => $testNumber
      ]
    ]);
  }

  function delete($where) {
    return parent::delete($where);
  }
}
<?php

namespace fsm\database\gap\packing\harvestMachineCleaning;

require_once realpath(dirname(__FILE__).'/../../../../dao/InsertableTable.php');
use fsm\database as db;

class Logs extends db\InsertableTable
{
  function __construct() { 
    parent::__construct('gap_packing_harvest_machine_cleaning_logs');
  }

  function selectByCaptureDateID($logID) {
    return parent::select(
      [
        "$this->table.id",
        'entry_num',
        'date',
        'harvest_machine_quantity',
        'disinfection',
        'soap_bag_wash',
        'rinse',
        'conditions',
        'noted_defects',
        'initials'
      ],
      [
        'capture_date_id' => $logID
      ]
    );
  }

  function hasByCaptureDateIDAndEntry($dateID, $entryNumber) {
    return parent::has([
      'AND' => [
        'capture_date_id' => $dateID,
        'entry_num' => $entryNumber
      ]
    ]);
  }

  function selectIDByCaptureDateIDAndEntry($dateID, $entryNumber) {
    return parent::select(
      [
        "$this->table.id(id)",
      ],
      [
        'AND' => [
          'capture_date_id' => $dateID,
          'entry_num' => $entryNumber
        ]
      ]
    )[0]['id'];
  }

  function updateByCapturedLogIDAndEntry($changes, $dateID, $entryNumber) {
    return parent::update($changes, [
      'AND' => [
        'capture_date_id' => $dateID,
        'entry_num' => $entryNumber
      ]
    ]);
  }

  function delete($where) {
    return parent::delete($where);
  }
}

?>
<?php

namespace fsm\database\gmp\packing\harvestTool;
require_once realpath(dirname(__FILE__).'/../../../../dao/InsertableTable.php');
use fsm\database as db;

class TypeLogs extends db\InsertableTable
{
  function __construct() { 
    parent::__construct('gmp_packing_harvest_tool_type_logs');
  }

  function selectByDateLogID($dateLogID){
    return parent::$dataBase->query(
      "SELECT
        type_id,
        t.name_en AS name_en,
        t.name_es AS name_es,
        DATE_FORMAT(issue_time, '%H:%i') AS issue_time,
        issue_qty,
        issue_conditions,
        DATE_FORMAT(recovery_time, '%H:%i') AS recovery_time,
        recovery_qty,
        recovery_conditions,
        sanitation,
        deficiencies,
        corrective_actions
      FROM $this->table
      INNER JOIN gmp_packing_harvest_tool_types AS t
        ON $this->table.type_id = t.id
      WHERE date_log_id = $dateLogID"
    )->fetchAll();
  }

  function updateByDateIDAndTypeID($changes, $dateID, $typeID) {
    return parent::update($changes, [
      'AND' => [
        'date_log_id' => $dateID,
        'type_id' => $typeID
      ]
    ]);
  }

  function delete($where) {
    return parent::delete($where);
  }
}

?>
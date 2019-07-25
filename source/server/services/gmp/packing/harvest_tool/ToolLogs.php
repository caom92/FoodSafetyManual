<?php

namespace fsm\database\gmp\packing\harvestTool;
require_once realpath(dirname(__FILE__).'/../../../../dao/InsertableTable.php');
use fsm\database as db;

class ToolLogs extends db\InsertableTable
{
  function __construct() { 
    parent::__construct('gmp_packing_harvest_tool_tool_logs');
  }

  function selectByDateLogID($dateLogID){
    return parent::$dataBase->query(
      "SELECT
        tool_id,
        t.name AS name,
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
      INNER JOIN gmp_packing_harvest_tool_tools AS t
        ON $this->table.tool_id = t.id
      WHERE date_log_id = $dateLogID"
    )->fetchAll();
  }

  function updateByDateIDAndToolID($changes, $dateID, $toolID) {
    return parent::update($changes, [
      'AND' => [
        'date_log_id' => $dateID,
        'tool_id' => $toolID
      ]
    ]);
  }

  function delete($where) {
    return parent::delete($where);
  }
}

?>
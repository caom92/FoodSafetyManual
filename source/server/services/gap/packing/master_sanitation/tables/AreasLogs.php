<?php

namespace fsm\database\gap\packing\masterSanitation;
require_once realpath(dirname(__FILE__).'/../../../../../dao/InsertableTable.php');
use fsm\database as db;


// Interfaz para la tabla gap_packing_master_sanitation_logs
class AreasLogs extends db\InsertableTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gap_packing_master_sanitation_logs
  function __construct() { 
    parent::__construct('gap_packing_master_sanitation_areas_logs');
  }

  function selectByCaptureDateID($logID) {
    return parent::$dataBase->query(
      "SELECT 
        id, 
        capture_date_id, 
        DATE_FORMAT(time, '%H:%i') AS time, 
        notes, 
        person_performing_sanitation
      FROM
        $this->table
      WHERE capture_date_id = $logID"
    )->fetchAll();
  }

  function updateByCapturedLogIDAndAreaID($changes, $dateID, $areaID) {
    return parent::update($changes, [
      'AND' => [
        'capture_date_id' => $dateID,
        'area_id' => $areaID
      ]
    ]);
  }
}

?>

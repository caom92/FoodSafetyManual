<?php

namespace fsm\database\gap\packing\coolerCleaning;
require_once realpath(dirname(__FILE__).'/../../../../../dao/InsertableTable.php');
use fsm\database as db;


// Interfaz para la tabla gap_packing_cooler_cleaning_logs
class ChecksLogs extends db\InsertableTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gap_packing_cooler_cleaning_logs
  function __construct() { 
    parent::__construct('gap_packing_cooler_cleaning_checks_logs');
  }

  function selectByAreaLogID($areaLogID) {
    return parent::select(
      [
        'a.id(area_id)',
        'a.name(area_name)',
        'c.position(item_order)', 
        'c.id(item_id)',
        'c.name(item_name)',
        'c.type_id(type_id)',
        't.name(type_name)',
        'status',
        'corrective_action',
        'notes'
      ],
      [
        'area_log_id' => $areaLogID,
        'ORDER' => [
          'c.type_id', 'c.position'
        ]
      ],
      [
        '[><]gap_packing_cooler_cleaning_checks(c)' => [
          'check_id' => 'id'
        ],
        '[><]gap_packing_cooler_cleaning_areas(a)' => [
          'c.area_id' => 'id'
        ],
        '[><]gap_packing_cooler_cleaning_types(t)' => [
          'c.type_id' => 'id'
        ]
      ]
    );
  }

  function updateByCapturedLogIDAndCheckID($changes, $logID, $checkID) {
    return parent::$dataBase->query(
      "UPDATE 
        $this->table
      INNER JOIN gap_packing_cooler_cleaning_areas_logs AS a
        ON area_log_id = a.id
      INNER JOIN captured_logs AS cl
        ON a.capture_date_id = cl.id
      SET 
        status = ".$changes['status'].",
        corrective_action = '{$changes["corrective_action"]}',
        $this->table.notes = '{$changes["notes"]}'
      WHERE cl.id = $logID AND check_id = $checkID"
    );
  }
}

?>

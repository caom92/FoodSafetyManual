<?php

namespace fsm\database\gap\packing\masterSanitation;
require_once realpath(dirname(__FILE__).'/../../../../../dao/InsertableTable.php');
use fsm\database as db;


// Interfaz para la tabla gap_packing_master_sanitation_logs
class Logs extends db\InsertableTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gap_packing_master_sanitation_logs
  function __construct() { 
    parent::__construct('gap_packing_master_sanitation_logs');
  }

  function selectByCaptureDateID($logID) {
    return parent::select(
      [
        'a.id(area_id)',
        'a.name(area_name)',
        'c.position(item_order)', 
        'c.id(item_id)',
        'c.name(item_name)',
        'c.type_id(type_id)',
        't.name(type_name)',
        'status'
      ],
      [
        'capture_date_id' => $logID,
        'ORDER' => [
          'a.position', 't.position', 'c.position'
        ]
      ],
      [
        '[><]gap_packing_master_sanitation_checks(c)' => [
          'check_id' => 'id'
        ],
        '[><]gap_packing_master_sanitation_areas(a)' => [
          'c.area_id' => 'id'
        ],
        '[><]gap_packing_master_sanitation_types(t)' => [
          'c.type_id' => 'id'
        ]
      ]
    );
  }

  function updateByCapturedLogID($changes, $dateID) {
    return parent::update($changes, [
      'AND' => [
        'capture_date_id' => $dateID
      ]
    ]);
  }

  function updateByCapturedLogIDAndCheckID($changes, $dateID, $checkID) {
    return parent::update($changes, [
      'AND' => [
        'capture_date_id' => $dateID,
        'check_id' => $checkID
      ]
    ]);
  }
}

?>

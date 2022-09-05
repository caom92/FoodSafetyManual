<?php

namespace fsm\database\gmp\packing\pestControlInspectionExterior;

require_once realpath(dirname(__FILE__).'/../../../../dao/InsertableTable.php');
use fsm\database as db;

class Logs extends db\InsertableTable
{
  function __construct() { 
    parent::__construct('gmp_packing_pest_control_inspection_exterior_logs');
  }

  function selectByCaptureDateID($logID) {
    return parent::select(
      [
        "$this->table.id(table_id)",
        'area_id(id)',
        'a.name',
        'protection_status_id',
        'equipment_status_id',
        'pest_type_id',
        'area_verification_id',
        'task_id',
        'corrective_action_id',
        'captured_pests',
        'observations'
      ],
      [
        'capture_date_id' => $logID
      ],
      [
        '[><]gmp_packing_pest_control_inspection_exterior_areas(a)' => [
          'area_id' => 'id'
        ]
      ]
    );
  }

  function selectTotalCapturedPestsByDateInterval($startDate, $endDate) {
    return parent::$dataBase->query(
      "SELECT
        `l`.`area_id` AS `id`,
        `a`.`name` AS `name`,
        IFNULL(SUM(`captured_pests`), 0) AS `total_pests`
      FROM `gmp_packing_pest_control_inspection_exterior_logs` AS `l`
      INNER JOIN `gmp_packing_pest_control_inspection_exterior_areas` AS `a`
      ON `l`.`area_id` = `a`.`id`
      INNER JOIN `captured_logs` AS `c`
      ON `l`.`capture_date_id` = `c`.`id`
      WHERE `c`.`capture_date` BETWEEN '$startDate' AND '$endDate'
      GROUP BY `l`.`area_id`"
    )->fetchAll();
  }

  function selectWithNamesByCaptureDateID($logID) {
    return parent::select(
      [
        "$this->table.id(table_id)",
        'area_id(id)',
        'a.name',
        'ps.name(protection_status)',
        'es.name(equipment_status)',
        'pt.name(pest_type)',
        'av.name(area_verification)',
        't.name(task)',
        'ca.name(corrective_action)',
        'captured_pests',
        'observations'
      ],
      [
        'capture_date_id' => $logID
      ],
      [
        '[><]gmp_packing_pest_control_inspection_exterior_areas(a)' => [
          'area_id' => 'id'
        ],
        '[>]gmp_packing_pest_control_inspection_exterior_protection_status(ps)' => [
          'protection_status_id' => 'id'
        ],
        '[>]gmp_packing_pest_control_inspection_exterior_equipment_status(es)' => [
          'equipment_status_id' => 'id'
        ],
        '[>]gmp_packing_pest_control_inspection_exterior_pest_types(pt)' => [
          'pest_type_id' => 'id'
        ],
        '[>]gmp_packing_pest_control_inspection_exterior_area_verification(av)' => [
          'area_verification_id' => 'id'
        ],
        '[>]gmp_packing_pest_control_inspection_exterior_tasks(t)' => [
          'task_id' => 'id'
        ],
        '[>]gmp_packing_pest_control_inspection_exterior_corrective_actions(ca)' => [
          'corrective_action_id' => 'id'
        ]
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

  function updateByCapturedLogID($changes, $dateID) {
    return parent::update($changes, [
      'AND' => [
        'capture_date_id' => $dateID
      ]
    ]);
  }

  function delete($where) {
    return parent::delete($where);
  }
}

?>
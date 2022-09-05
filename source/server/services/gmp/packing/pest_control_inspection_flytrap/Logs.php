<?php

namespace fsm\database\gmp\packing\pestControlInspectionFlytrap;

require_once realpath(dirname(__FILE__).'/../../../../dao/InsertableTable.php');
use fsm\database as db;

class Logs extends db\InsertableTable
{
  function __construct() { 
    parent::__construct('gmp_packing_pest_control_inspection_flytrap_logs');
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
        '[><]gmp_packing_pest_control_inspection_flytrap_areas(a)' => [
          'area_id' => 'id'
        ]
      ]
    );
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
        '[><]gmp_packing_pest_control_inspection_flytrap_areas(a)' => [
          'area_id' => 'id'
        ],
        '[>]gmp_packing_pest_control_inspection_flytrap_protection_status(ps)' => [
          'protection_status_id' => 'id'
        ],
        '[>]gmp_packing_pest_control_inspection_flytrap_equipment_status(es)' => [
          'equipment_status_id' => 'id'
        ],
        '[>]gmp_packing_pest_control_inspection_flytrap_pest_types(pt)' => [
          'pest_type_id' => 'id'
        ],
        '[>]gmp_packing_pest_control_inspection_flytrap_area_verification(av)' => [
          'area_verification_id' => 'id'
        ],
        '[>]gmp_packing_pest_control_inspection_flytrap_tasks(t)' => [
          'task_id' => 'id'
        ],
        '[>]gmp_packing_pest_control_inspection_flytrap_corrective_actions(ca)' => [
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
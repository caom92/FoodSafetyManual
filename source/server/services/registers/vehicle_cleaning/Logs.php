<?php

namespace fsm\database\vehicleCleaning;
require_once realpath(dirname(__FILE__).'/../../../dao/InsertableTable.php');
use fsm\database as db;

class Logs extends db\InsertableTable
{
  function __construct() {
    parent::__construct('vehicle_cleaning_registers');
  }

  function selectByZoneID($zoneID, $startDate, $endDate) {
    return parent::select(
      [
        "$this->table.id",
        'captured_register_id',
        'capture_date',
        'license_plate',
        'disinfection',
        'water_rinse',
        'conditions',
        'contamination_free',
        'corrective_action',
        'initials',
        'cr.submitter_id',
        'sub.first_name(submitter_first_name)',
        'sub.last_name(submitter_last_name)',
        'cr.zone_id',
        'z.name(zone)',
        'cr.supervisor_id',
        'su.first_name(supervisor_first_name)',
        'su.last_name(supervisor_last_name)',
        'su.signature_path',
        'cr.gp_supervisor_id',
        'gpsu.first_name(gp_supervisor_first_name)',
        'gpsu.last_name(gp_supervisor_last_name)',
        'gpsu.signature_path(gp_signature_path)'
      ],
      [
        'AND' => [
          'capture_date[>=]' => $startDate,
          'capture_date[<=]' => $endDate,
          'cr.zone_id' => $zoneID
        ],
        'ORDER' => [
          'capture_date' => 'DESC'
        ]
      ],
      [
        '[><]captured_registers(cr)' => [
          'captured_register_id' => 'id'
        ],
        '[><]zones(z)' => [
          'cr.zone_id' => 'id'
        ],
        '[>]users(sub)' => [
          'cr.submitter_id' => 'id'
        ],
        '[>]users(su)' => [
          'cr.supervisor_id' => 'id'
        ],
        '[>]users(gpsu)' => [
          'cr.gp_supervisor_id' => 'id'
        ]
      ]
    );
  }

  function selectAll($startDate, $endDate) {
    return parent::select(
      [
        "$this->table.id",
        'captured_register_id',
        'capture_date',
        'license_plate',
        'disinfection',
        'water_rinse',
        'conditions',
        'contamination_free',
        'corrective_action',
        'initials',
        'cr.submitter_id',
        'cr.zone_id',
        'z.name(zone)',
        'cr.supervisor_id',
        'su.signature_path',
        'cr.gp_supervisor_id',
        'gpsu.signature_path(gp_signature_path)'
      ],
      [
        'AND' => [
          'capture_date[>=]' => $startDate,
          'capture_date[<=]' => $endDate
        ],
        'ORDER' => [
          'capture_date' => 'DESC'
        ]
      ],
      [
        '[><]captured_registers(cr)' => [
          'captured_register_id' => 'id'
        ],
        '[><]zones(z)' => [
          'cr.zone_id' => 'id'
        ],
        '[>]users(su)' => [
          'cr.supervisor_id' => 'id'
        ],
        '[>]users(gpsu)' => [
          'cr.gp_supervisor_id' => 'id'
        ]
      ]
    );
  }

  function selectRecentRegistersByZoneID($zoneID) {
    return parent::select(
      [
        "$this->table.id",
        'captured_register_id',
        'capture_date',
        'license_plate',
        'disinfection',
        'water_rinse',
        'conditions',
        'contamination_free',
        'corrective_action',
        'initials',
        'cr.submitter_id',
        'sub.first_name(submitter_first_name)',
        'sub.last_name(submitter_last_name)',
        'cr.zone_id',
        'z.name(zone)',
        'cr.supervisor_id',
        'su.first_name(supervisor_first_name)',
        'su.last_name(supervisor_last_name)',
        'su.signature_path',
        'cr.gp_supervisor_id',
        'gpsu.first_name(gp_supervisor_first_name)',
        'gpsu.last_name(gp_supervisor_last_name)',
        'gpsu.signature_path(gp_signature_path)'
      ],
      [
        'cr.zone_id' => $zoneID,
        'ORDER' => [
          'capture_date' => 'DESC',
          "$this->table.id" => 'DESC'
        ],
        'LIMIT' => [
          0, 10
        ]
      ],
      [
        '[><]captured_registers(cr)' => [
          'captured_register_id' => 'id'
        ],
        '[><]zones(z)' => [
          'cr.zone_id' => 'id'
        ],
        '[>]users(sub)' => [
          'cr.submitter_id' => 'id'
        ],
        '[>]users(su)' => [
          'cr.supervisor_id' => 'id'
        ],
        '[>]users(gpsu)' => [
          'cr.gp_supervisor_id' => 'id'
        ]
      ]
    );
  }

  function selectRecentRegisters() {
    return parent::select(
      [
        "$this->table.id",
        'captured_register_id',
        'capture_date',
        'license_plate',
        'disinfection',
        'water_rinse',
        'conditions',
        'contamination_free',
        'corrective_action',
        'initials',
        'cr.submitter_id',
        'cr.zone_id',
        'z.name(zone)',
        'cr.supervisor_id',
        'su.signature_path',
        'cr.gp_supervisor_id',
        'gpsu.signature_path(gp_signature_path)'
      ],
      [
        'ORDER' => [
          'capture_date' => 'DESC'
        ],
        'LIMIT' => [
          0, 10
        ]
      ],
      [
        '[><]captured_registers(cr)' => [
          'captured_register_id' => 'id'
        ],
        '[><]zones(z)' => [
          'cr.zone_id' => 'id'
        ],
        '[>]users(su)' => [
          'cr.supervisor_id' => 'id'
        ],
        '[>]users(gpsu)' => [
          'cr.gp_supervisor_id' => 'id'
        ]
      ]
    );
  }

  function selectByCapturedRegisterID($capturedRegisterID) {
    return parent::select(
      [
        "$this->table.id",
        'captured_register_id',
        'capture_date',
        'license_plate',
        'disinfection',
        'water_rinse',
        'conditions',
        'contamination_free',
        'corrective_action',
        'initials',
        'cr.submitter_id',
        'cr.zone_id',
        'z.name(zone)',
        'cr.supervisor_id',
        'su.signature_path',
        'cr.gp_supervisor_id',
        'gpsu.signature_path(gp_signature_path)'
      ],
      [
        'captured_register_id' => $capturedRegisterID,
      ],
      [
        '[><]captured_registers(cr)' => [
          'captured_register_id' => 'id'
        ],
        '[><]zones(z)' => [
          'cr.zone_id' => 'id'
        ],
        '[>]users(su)' => [
          'cr.supervisor_id' => 'id'
        ],
        '[>]users(gpsu)' => [
          'cr.gp_supervisor_id' => 'id'
        ]
      ]
    )[0];
  }

  function updateByCapturedRegisterID($changes, $capturedRegisterID) {
    return parent::update(
      $changes,
      [
        'captured_register_id' => $capturedRegisterID
      ]
    );
  }
}

?>
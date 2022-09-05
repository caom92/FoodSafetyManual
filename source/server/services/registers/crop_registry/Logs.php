<?php

namespace fsm\database\cropRegistry;
require_once realpath(dirname(__FILE__).'/../../../dao/InsertableTable.php');
use fsm\database as db;

class Logs extends db\InsertableTable
{
  function __construct() {
    parent::__construct('crop_registry_registers');
  }

  function selectByZoneID($zoneID) {
    return parent::select(
      [
        "$this->table.id",
        'captured_register_id',
        'cr.capture_date',
        /*'license_plate',
        'disinfection',
        'water_rinse',
        'conditions',
        'contamination_free',
        'corrective_action',
        'initials',*/
        'cr.submitter_id',
        'cr.zone_id',
        'cr.supervisor_id',
        'su.signature_path'
      ],
      [
        'cr.zone_id' => $zoneID,
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
        ]
      ]
    );
  }
}

?>
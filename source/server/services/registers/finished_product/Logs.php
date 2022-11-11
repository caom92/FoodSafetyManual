<?php

namespace fsm\database\finishedProduct;
require_once realpath(dirname(__FILE__).'/../../../dao/InsertableTable.php');
use fsm\database as db;

class Logs extends db\InsertableTable
{
  public $infoColumns = [
    'captured_register_id',
    'code_id',
    'folio',
    'temperature',
    'color',
    'label',
    'weight',
    'traceability',
    'mechanical_damage',
    'soggy',
    'insect_damage',
    'decoloration',
    'decay',
    'wrinkly',
    'busted',
    'dehydration',
    'status_id',
    'exposition_temperature',
    'sampling',
    'notes'
  ];

  public $codeColumns = [
    'fpc.code'
    //'fpc.description'
  ];

  public $statusColumns = [
    'fps.name(status_name)'
  ];
  function __construct() {
    parent::__construct('finished_product_registers');
  }

  function selectByZoneID($zoneID, $startDate, $endDate) {
    return parent::select(
      array_merge([
        "$this->table.id",
        'cr.capture_date',
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
      ], $this->infoColumns, $this->codeColumns, $this->statusColumns),
      [
        'AND' => [
          'capture_date[>=]' => $startDate,
          'capture_date[<=]' => $endDate,
          'cr.zone_id' => $zoneID,
          'cr.is_active' => 1
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
        ],
        '[>]finished_product_codes(fpc)' => [
          'code_id' => 'id'
        ],
        '[>]finished_product_status(fps)' => [
          'status_id' => 'id'
        ]
      ]
    );
  }

  function selectAll($startDate, $endDate) {
    return parent::select(
      array_merge([
        "$this->table.id",
        'cr.capture_date',
        'cr.submitter_id',
        'cr.zone_id',
        'z.name(zone)',
        'cr.supervisor_id',
        'su.signature_path',
        'cr.gp_supervisor_id',
        'gpsu.signature_path(gp_signature_path)'
      ], $this->infoColumns, $this->codeColumns, $this->statusColumns),
      [
        'AND' => [
          'capture_date[>=]' => $startDate,
          'capture_date[<=]' => $endDate,
          'cr.is_active' => 1
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
        ],
        '[>]finished_product_codes(fpc)' => [
          'code_id' => 'id'
        ],
        '[>]finished_product_status(fps)' => [
          'status_id' => 'id'
        ]
      ]
    );
  }

  function selectPendingRegisters($zoneID) {
    return parent::select(
      array_merge([
        "$this->table.id",
        'cr.capture_date',
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
      ], $this->infoColumns, $this->codeColumns, $this->statusColumns),
      [
        'AND' => [
          'cr.zone_id' => $zoneID,
          'cr.supervisor_id' => NULL,
          'cr.is_active' => 1
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
        ],
        '[>]finished_product_codes(fpc)' => [
          'code_id' => 'id'
        ],
        '[>]finished_product_status(fps)' => [
          'status_id' => 'id'
        ]
      ]
    );
  }

  function selectGPPendingRegisters() {
    return parent::select(
      array_merge([
        "$this->table.id",
        'cr.capture_date',
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
      ], $this->infoColumns, $this->codeColumns, $this->statusColumns),
      [
        'AND' => [
          'cr.supervisor_id[!]' => NULL,
          'cr.gp_supervisor_id' => NULL,
          'cr.is_active' => 1
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
        ],
        '[>]finished_product_codes(fpc)' => [
          'code_id' => 'id'
        ],
        '[>]finished_product_status(fps)' => [
          'status_id' => 'id'
        ]
      ]
    );
  }

  function selectRecentRegistersByZoneID($zoneID) {
    return parent::select(
      array_merge([
        "$this->table.id",
        'cr.capture_date',
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
      ], $this->infoColumns, $this->codeColumns, $this->statusColumns),
      [
        'AND' => [
          'cr.zone_id' => $zoneID,
          'cr.is_active' => 1
        ],
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
        ],
        '[>]finished_product_codes(fpc)' => [
          'code_id' => 'id'
        ],
        '[>]finished_product_status(fps)' => [
          'status_id' => 'id'
        ]
      ]
    );
  }

  function selectRecentRegisters() {
    return parent::select(
      array_merge([
        "$this->table.id",
        'cr.capture_date',
        'cr.submitter_id',
        'cr.zone_id',
        'z.name(zone)',
        'cr.supervisor_id',
        'su.signature_path',
        'cr.gp_supervisor_id',
        'gpsu.signature_path(gp_signature_path)'
      ], $this->infoColumns, $this->codeColumns, $this->statusColumns),
      [
        'cr.is_active' => 1,
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
        ],
        '[>]finished_product_codes(fpc)' => [
          'code_id' => 'id'
        ],
        '[>]finished_product_status(fps)' => [
          'status_id' => 'id'
        ]
      ]
    );
  }

  function selectByCapturedRegisterID($capturedRegisterID) {
    return parent::select(
      array_merge([
        "$this->table.id",
        'cr.capture_date',
        'cr.submitter_id',
        'cr.zone_id',
        'z.name(zone)',
        'cr.supervisor_id',
        'su.signature_path',
        'cr.gp_supervisor_id',
        'gpsu.signature_path(gp_signature_path)'
      ], $this->infoColumns, $this->codeColumns, $this->statusColumns),
      [
        'AND' => [
          'captured_register_id' => $capturedRegisterID,
          'cr.is_active' => 1
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
        ],
        '[>]finished_product_codes(fpc)' => [
          'code_id' => 'id'
        ],
        '[>]finished_product_status(fps)' => [
          'status_id' => 'id'
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
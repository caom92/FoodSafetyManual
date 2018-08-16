<?php

namespace fsm\database\gmp\packing\ozone;
require_once realpath(__DIR__.'/../../../../dao/ToggableItemsTable.php');
use fsm\database as db;


class MachinesFields extends db\ToggableItemsTable
{
  function __construct() {
    parent::__construct('gmp_packing_ozone_water_machine_fields');
  }

  function selectAllByMachineID($machineID) {
    return parent::select(
      [ "{$this->table}.id", 'is_active', 'f.name_en(name_en)', 'f.name_es(name_es)', 'f.id(field_id)' ],
      [ 'machine_id' => $machineID ],
      [
        '[><]gmp_packing_ozone_water_fields(f)' => [
          'field_id' => 'id'
        ]
      ]
    );
  }

  function selectActiveByMachineID($machineID) {
    return parent::select(
      [ "{$this->table}.id", 'f.name_en', 'f.name_es', 'f.id(field_id)' ],
      [ 
        'AND' => [
          'is_active' => TRUE,
          'machine_id' => $machineID
        ]
      ],
        [
        '[><]gmp_packing_ozone_water_fields(f)' => [
          'field_id' => 'id'
        ]
      ]
    );
  }
}

?>
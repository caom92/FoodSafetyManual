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
      [ 'id', 'is_active', 'name_en(name)', 'name_es' ],
      [ 'machine_id' => $machineID ]
    );
  }

  function selectActiveByMachineID($machineID) {
    return parent::select(
      [ 'id', 'name_en(name)', 'name_es' ],
      [ 
        'AND' => [
          'is_active' => TRUE,
          'machine_id' => $machineID
        ]
      ]
    );
  }
}

?>
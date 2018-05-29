<?php

namespace fsm\database\gmp\packing\ozone;
require_once realpath(__DIR__.'/../../../../dao/DataBaseTable.php');
use fsm\database as db;


class Fields extends db\DataBaseTable
{
  function __construct() {
    parent::__construct('gmp_packing_ozone_water_fields');
  }

  function selectAll() {
    return parent::select('*');
  }
}

?>
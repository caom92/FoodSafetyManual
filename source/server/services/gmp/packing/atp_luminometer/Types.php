<?php

namespace fsm\database\gmp\packing\atpLuminometer;
require_once realpath(dirname(__FILE__).'/../../../../dao/DataBaseTable.php');
use fsm\database as db;

class Types extends db\DataBaseTable
{
  function __construct() { 
    parent::__construct('gmp_packing_atp_luminometer_types');
  }

  function selectAll() {
    return parent::select('*');
  }
}

?>
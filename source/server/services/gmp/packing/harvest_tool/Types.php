<?php

namespace fsm\database\gmp\packing\harvestTool;
require_once realpath(dirname(__FILE__).'/../../../../dao/DataBaseTable.php');
use fsm\database as db;

class Types extends db\DataBaseTable
{
  function __construct() { 
    parent::__construct('gmp_packing_harvest_tool_types');
  }

  function selectAll() {
    return parent::select('*');
  }
}

?>
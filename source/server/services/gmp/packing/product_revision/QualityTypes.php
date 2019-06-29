<?php

namespace fsm\database\gmp\packing\productRevision;
require_once realpath(dirname(__FILE__).'/../../../../dao/DataBaseTable.php');
use fsm\database as db;

class QualityTypes extends db\DataBaseTable
{
  function __construct() { 
    parent::__construct('gmp_packing_product_revision_quality_types');
  }

  // Returns an associative which contains the list of quality types
  function selectAll() {
    return parent::select('*');
  }
}

?>
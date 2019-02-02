<?php

namespace fsm\database\capa;
require_once realpath(dirname(__FILE__).'/../../dao/InsertableTable.php');
use fsm\database as db;

class Links extends db\InsertableTable
{
  function __construct() { 
    parent::__construct('capa_links');
  }
}

?>
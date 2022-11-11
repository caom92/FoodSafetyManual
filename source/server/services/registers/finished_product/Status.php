<?php

namespace fsm\database\finishedProduct;
require_once realpath(dirname(__FILE__).'/../../../dao/InsertableTable.php');
use fsm\database as db;

class Status extends db\InsertableTable
{
  function __construct() {
    parent::__construct('finished_product_status');
  }

  function selectByID($id) {
    return parent::select(
      [
        "$this->table.id(id)",
        'name'
      ],
      [
        'id' => $id
      ]
    )[0];
  }

  function selectAll() {
    return parent::select([
      'id',
      'name'
    ],
    [
      'ORDER' => [
        'name'
      ]
    ]);
  }
}

?>

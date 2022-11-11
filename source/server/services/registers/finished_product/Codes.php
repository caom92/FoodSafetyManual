<?php

namespace fsm\database\finishedProduct;
require_once realpath(dirname(__FILE__).'/../../../dao/InsertableTable.php');
use fsm\database as db;

class Codes extends db\InsertableTable
{
  function __construct() {
    parent::__construct('finished_product_codes');
  }

  function selectAll() {
    return parent::select('*');
  }

  function hasByCode($code) {
    return parent::has([
      'code' => $code
    ]);
  }

  function selectByID($id) {
    return parent::select(
      [
        "$this->table.id(id)",
        'code'
        //'description'
      ],
      [
        'id' => $id
      ]
    )[0];
  }

  function selectByCode($code) {
    return parent::select(
      [
        "$this->table.id(id)",
        'code'
        //'description'
      ],
      [
        'code' => $code
      ]
    )[0];
  }

  function updateByID($changes, $id) {
    return parent::update(
      $changes,
      [
        'id' => $id
      ]
    );
  }
}

?>

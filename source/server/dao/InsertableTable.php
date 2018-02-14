<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataBaseTable.php");


// A data access object that allows data to be inserted to the table that
// it represents
class InsertableTable extends DataBaseTable
{
  // Creates an interface for interacting with the table of the especified
  // name in the data base
  function __construct($tableName) {
    parent::__construct($tableName);
  }

  // Insert new rows to the data base table
  function insert($rows) {
    return parent::insert($rows);
  }
}

?>
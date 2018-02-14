<?php

namespace fsm\database;
require_once realpath(dirname(__FILE__).'/../../dao/InsertableTable.php');
use fsm\database as db;


// Interfaz para la tabla suppliers
class Suppliers extends db\InsertableTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla suppliers
  function __construct() { 
    parent::__construct('suppliers');
  }

  // Returns an associative which contains the list of the codes of 
  // all the registered suppliers
  function selectCode() {
    return parent::select(
      [ "$this->table.id", 'code' ],
      [],
      [
        '[><]contact_info(i)' => [
          'contact_info_id' => 'id'
        ]
      ]
    );
  }

  // Returns a list of all the suppliers registered
  function selectAll() {
    return parent::select(
      [ 
        "$this->table.id", 
        "i.company_name(company_name)",
        'i.contact_name(contact_name)',
        'i.phone_num(phone_num)',
        'i.email(email)',
        'code'
      ],
      [],
      [
        '[><]contact_info(i)' => [
          'contact_info_id' => 'id'
        ]
      ]
    );
  }
}

?>
<?php

namespace fsm\database;
require_once realpath(dirname(__FILE__).'/../../dao/InsertableTable.php');
use fsm\database as db;


// Interfaz para la tabla customers
class Customers extends db\InsertableTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla customers
  function __construct() { 
    parent::__construct('customers');
  }

  // Retorna una lista de los campos de nombre de todos los renglones de la 
  // tabla
  // [out]  return (dictionary): arreglo asociativo que contiene el nombre 
  //        y ID de todos los clientes registrados en la tabla
  function selectName() {
    return parent::select(
      [ "$this->table.id", "i.company_name(name)" ],
      [],
      [
        '[><]contact_info(i)' => [
          'contact_info_id' => 'id'
        ]
      ]
    );
  }

  // Retorna una lista de todos los renglones de la tabla
  // [out]  return (dictionary): arreglo asociativo que contiene los 
  //        datos de todos los clientes registrados en la tabla
  function selectAll() {
    return parent::select(
      [ 
        "$this->table.id", 
        "i.company_name(company_name)",
        'i.contact_name(contact_name)',
        'i.phone_num(phone_num)',
        'i.email(email)',
        'city',
        'salesman'
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
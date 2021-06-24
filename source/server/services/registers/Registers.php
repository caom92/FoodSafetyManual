<?php

namespace fsm\database;
require_once realpath(dirname(__FILE__).'/../../dao/DataBaseTable.php');
use fsm\database as db;

// Interfaz para la tabla logs
class Registers extends db\DataBaseTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla registers
  function __construct() { 
    parent::__construct('registers');
  }

  // Regresa una lista de todos los nombres asociados con un nombre base,
  // para poder mostrar el nombre del registro en la interfaz
  function getNamesByCode($code) {
    return parent::select(
      [
        'name_en(en)',
        'name_es(es)'
      ],
      [
        'code' => $code
      ]
    );
  }

  function getIDByCode($code) {
    return parent::select(
      [
        'id'
      ],
      [
        'code' => $code
      ]
    )[0]['id'];
  }

  // Regresa una lista de todos los registros
  function selectAll() {
    return parent::select(
      [
        'id',
        'code',
        'name_en',
        'name_es'
      ],
      [
        'ORDER' => [
          'id'
        ]
      ]
    );
  }
}

?>
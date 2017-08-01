<?php

namespace fsm\database\gap\packing\preop;
require_once realpath(dirname(__FILE__).'/../../../../dao/DataBaseTable.php');
use fsm\database as db;


// Interfaz para la tabla gap_packing_preop_corrective_actions
class CorrectiveActions extends db\DataBaseTable{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gap_packing_preop_corrective_actions
  function __construct() { 
    parent::__construct('gap_packing_preop_corrective_actions');
  }

  // Retorna todos los renglones de la tabla excepto aquel que contiene los 
  // datos de la opcion identificada como 'Other'
  // [out]  return (dictionary): arreglo asociativo que contiene los datos de
  //        todas las acciones correctivas, excepto 'Other' organizados en 
  //        renglones y columnas
  function selectAllButOptionOther() {
    return parent::select([
      'id', 'code', 'en_name(en)', 'es_name(es)'
    ], ['code[!]' => 'OTH']);
  }

  // Retorna el ID de la opción Otro
  function getOptionNoneID() {
    $row = parent::get(['id'], [ 'name' => 'None' ]);
    return $row['id'];
  }
}
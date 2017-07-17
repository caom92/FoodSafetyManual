<?php

namespace fsm\database\gmp\docControl\docControl;
require_once realpath(dirname(__FILE__).'/../../../../dao/ToggableItemsTable.php');
use fsm\database as db;


// Interfaz para la tabla gmp_packing_doc_control_doc_control_documents
class Documents extends db\ToggableItemsTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gmp_packing_doc_control_doc_control_documents
  function __construct() { 
    parent::__construct('gmp_packing_doc_control_doc_control_documents');
  }

  // Retorna la lista de los documentos almacenados en la base de datos que
  // tengan registrados el ID de zona especificado
  function selectByZoneID($zoneID) {
    return parent::select(['id', 'name'], ['zone_id' => $zoneID]);
  }
}

?>
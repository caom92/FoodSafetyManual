<?php

namespace fsm\database\gmp\docControl\docControl;
require_once realpath(dirname(__FILE__).'/../../../../dao/LogTable.php');
use fsm\database as db;


// Interfaz para la tabla gmp_packing_doc_control_doc_control_logs
class Logs extends db\LogTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gmp_packing_doc_control_doc_control_logs
  function __construct() { 
    parent::__construct('gmp_packing_doc_control_doc_control_logs');
  }

  // Retorna una lista de todos los renglones en la tabla que tengan asignado
  // el ID de la fecha de captura especificado
  // [in]   dateID (int): el ID de la fecha en que los datos fueron capturados
  //        en la base de datos
  // [out]  return (dictionary): un arreglo asociativo que contiene los datos
  //        de la tabla que tengan asignado el ID especificado organizados en
  //        renglones y columnas
  function selectByCaptureDateID($dateID) {
    return parent::select(
      [
        'document_id',
        'd.name(document_name)',
        'document_employee',
        'document_date',
        'notes',
        'additional_info_url',
        'picture1',
        'picture2'
      ],
      [
        'capture_date_id' => $dateID,
        'ORDER' => [
          'document_id'
        ]
      ],
      [
        '[><]gmp_doc_control_doc_control_documents' => [
          'id' => 'document_id'
        ]
      ]
    );
  }

  // Modifica los datos registrados en la tabla que tengan el ID de fecha de 
  // captura y ID de documento especificados
  // [in]   changes (dictionary): arreglo asociativo que contiene los datos que 
  //        van a ser añadidos en la tabla organizados por columnas
  // [in]   dateID (uint): el ID de fecha de captura cuyo renglon en la tabla
  //        va a ser modificado
  // [in]   docID (uint): el ID del documento cuyos registros van a ser 
  //        modificados
  function updateByCaptureDateIDAndDocumentID($changes, $dateID, $docID) {
    return parent::update(
      $changes, [ 'AND' => [
        'capture_date_id' => $dateID,
        'document_id' => $docID
      ]]
    );
  }
}

?>
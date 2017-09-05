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
    parent::__construct('gmp_doc_control_doc_control_logs');
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
        'pictures',
        'files'
      ],
      [
        'capture_date_id' => $dateID,
        'ORDER' => [
          'document_id'
        ]
      ],
      [
        '[><]gmp_doc_control_doc_control_documents(d)' => [
          'document_id' => 'id'
        ]
      ]
    );
  }

  // Retorna una lista de todos los renglones en la tabla que tengan asignado
  // el ID de la fecha de captura especificado
  // [in]   dateID (int): el ID de la fecha en que los datos fueron capturados
  //        en la base de datos
  // [out]  return (dictionary): un arreglo asociativo que contiene los datos
  //        de la tabla que tengan asignado el ID especificado organizados en
  //        renglones y columnas
  function selectByCaptureDateIDAndDocumentID($dateID, $documentID) {
    return parent::select(
      [
        'document_id',
        'd.name(document_name)',
        'document_employee',
        'document_date',
        'notes',
        'additional_info_url',
        'pictures',
        'files'
      ],
      [
        'AND' => [
          'capture_date_id' => $dateID,
          'document_id' => $documentID
        ],
        'ORDER' => [
          'document_id'
        ]
      ],
      [
        '[><]gmp_doc_control_doc_control_documents(d)' => [
          'document_id' => 'id'
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

  function selectByDateIntervalLogIDAndZoneID($start, $end, $zoneID) {
    $statusID = parent::$dataBase->get(
      'log_status', 'id', [ 'name' => 'Approved']);
    return parent::$dataBase->query("
      SELECT
        cl.id AS id,
        cl.capture_date AS capture_date,
        cl.employee_id AS employee_id,
        cl.approval_date AS approval_date,
        cl.supervisor_id AS supervisor_id,
        cl.extra_info1 AS extra_info1,
        cl.extra_info2 AS extra_info2,
        document_id,
        d.name AS document_name,
        document_employee,
        document_date,
        notes,
        additional_info_url,
        pictures,
        files
      FROM
        $this->table
      INNER JOIN 
        gmp_doc_control_doc_control_documents AS d
        ON document_id = d.id
      INNER JOIN
        captured_logs AS cl
        ON
          capture_date_id = cl.id
          AND cl.status_id = {$statusID}
      INNER JOIN
        users AS u
        ON cl.employee_id = u.id
          AND u.zone_id = $zoneID
      WHERE
        '$start' <= document_date 
        AND document_date <= '$end'
      ORDER BY
        document_date
    ");
  }

  function selectByDateIntervalLogIDZoneIDAndDocumentID(
    $start, 
    $end, 
    $zoneID, 
    $documentID
  ) {
    $statusID = parent::$dataBase->get(
      'log_status', 'id', [ 'name' => 'Approved']);
    return parent::$dataBase->query("
      SELECT
        cl.id AS id,
        cl.capture_date AS capture_date,
        cl.employee_id AS employee_id,
        cl.approval_date AS approval_date,
        cl.supervisor_id AS supervisor_id,
        cl.extra_info1 AS extra_info1,
        cl.extra_info2 AS extra_info2,
        document_id,
        d.name AS document_name,
        document_employee,
        document_date,
        notes,
        additional_info_url,
        pictures,
        files
      FROM
        $this->table
      INNER JOIN 
        gmp_doc_control_doc_control_documents AS d
        ON document_id = d.id
      INNER JOIN
        captured_logs AS cl
        ON
          capture_date_id = cl.id
          AND cl.status_id = {$statusID}
      INNER JOIN
        users AS u
        ON cl.employee_id = u.id
          AND u.zone_id = $zoneID 
      WHERE
        '$start' <= document_date 
        AND document_date <= '$end'
        AND document_id = $documentID
      ORDER BY
        document_date
    ");
  }
}

?>
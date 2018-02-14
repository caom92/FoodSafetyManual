<?php

namespace fsm\database\gmp\packing\agedProduct;
require_once realpath(dirname(__FILE__).'/../../../../dao/LogTable.php');
use fsm\database as db;


// Interfaz para la tabla gmp_packing_qc_aged_logs
class Logs extends db\LogTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gmp_packing_qc_aged_logs
  function __construct() { 
    parent::__construct('gmp_packing_qc_aged_logs');
  }

  // Retorna la lista de los IDs de todos los renglones en la tabla que tengan 
  // asignado el ID de fecha de captura especificado
  // [in]   dateID (int): el ID de la fecha en que los datos fueron capturados
  //        en la base de datos
  function selectIDByCapturedLogID($dateID) {
    return parent::select(
      'id', [ 'capture_date_id' => $dateID ]
    );
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
        'batch',
        'warehouse',
        'vendor',
        'item',
        'age',
        'q.id(quality_id)',
        'q.name(quality)',
        'origin',
        'packed_date',
        'quantity',
        'location',
        'a.id(action_id)',
        'a.name(action_name)',
        'notes',
        'album_url'
      ],
      [
        'capture_date_id' => $dateID,
        'ORDER' => [
          'packed_date'
        ]
      ],
      [
        '[><]quality_types(q)' => [
          'quality_id' => 'id'
        ],
        '[><]gmp_packing_qc_aged_actions(a)' => [
          'action_id' => 'id'
        ]
      ]
    );
  }

  // Modifica los renglones de la tabla que tienen registrado el ID de fecha de 
  // captura y el ID de renglon especificados, sustituyendo los viejos datos 
  // con los datos especificados
  // [in]   changes (dictionary): arreglo asociativo que contiene los datos que 
  //        van a ser añadidos en la tabla organizados por columnas
  // [in]   dateID (uint): el ID de fecha de captura cuyo renglon en la tabla
  //        va a ser modificado
  // [in]   logID (uint): el ID del renglon cuyos datos van a ser modificados
  // [out]  return (uint): el numero de renglones que fueron modificados
  function updateByCapturedLogIDAndID($changes, $dateID, $logID) {
    return parent::update($changes, [
      'AND' => [
        'capture_date_id' => $dateID,
        'id' => $logID
      ]
    ]);
  }
}

?>
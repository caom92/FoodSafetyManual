<?php

namespace fsm\database\gap\packing\harvestBlockInspection;
require_once realpath(dirname(__FILE__).'/../../../../dao/LogTable.php');
use fsm\database as db;


// Interfaz para la tabla gap_packing_harvest_block_inspection_logs
class QuestionLogs extends db\LogTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gap_packing_harvest_block_inspection_logs
  function __construct() { 
    parent::__construct('gap_packing_harvest_block_inspection_logs');
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
        'i.id',
        'i.name',
        'status',
        'comment'
      ],
      [
        'capture_date_id' => $dateID
      ],
      [
        '[><]gap_packing_harvest_block_inspection_items(i)' => [
          'item_id' => 'id'
        ]
      ]
    );
  }

  // Modifica los valores de los renglones que cumplan con las condiciones 
  // especificadas
  // [in]   changes (dictionary): arreglo asociativo que describe los nuevos 
  //        valores a ser ingresados a la tabla
  // [in]   logID (uint): el ID de la bitacora cuyos datos van a ser modificados
  // [in]   questionID (uint): el ID de la caracteristica cuyos datos 
  //        van a ser modificados 
  // [out]  return (uint): el numero de renglones que fueron modificados
  function updateByCapturedLogIDAndQuestionID($changes, $logID, $questionID) {
    return parent::update($changes, [
      'AND' => [
        'capture_date_id' => $logID,
        'item_id' => $questionID
      ]
    ]);
  }
}

?>
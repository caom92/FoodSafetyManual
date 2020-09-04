<?php

namespace fsm\database\gap\packing\harvestBlockInspection;
require_once realpath(dirname(__FILE__).'/../../../../dao/LogTable.php');
use fsm\database as db;

class InfoLogs extends db\LogTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gap_packing_harvest_block_inspection_info
  function __construct() { 
    parent::__construct('gap_packing_harvest_block_inspection_info');
  }

  // Retorna una lista de todos los renglones en la tabla que tengan asignado
  // el ID de la fecha de captura especificado
  // [in]   dateID (int): el ID de la fecha en que los datos fueron capturados
  //        en la base de datos
  // [out]  return (dictionary): un arreglo asociativo que contiene los datos
  //        de la tabla que tengan asignado el ID especificado organizados en
  //        renglones y columnas
  function selectByCaptureDateID($dateID) {
    return parent::$dataBase->query(
      "SELECT
        inspection_start_date,
        DATE_FORMAT(inspection_start_time, '%H:%i') AS inspection_start_time,
        inspection_end_date,
        DATE_FORMAT(inspection_end_time, '%H:%i') AS inspection_end_time,
        commodities,
        units,
        unit_type,
        grower,
        block_code,
        contact,
        location,
        country
      FROM $this->table
      WHERE capture_date_id = $dateID"
    )->fetchAll();
    /*return parent::select(
      [
        'inspection_start_date',
        'inspection_start_time',
        'inspection_end_date',
        'inspection_end_time',
        'commodities',
        'units',
        'unit_type',
        'grower',
        'block_code',
        'contact',
        'location',
        'country'
      ],
      [
        'capture_date_id' => $dateID
      ]
    );*/
  }

  // Modifica los valores de los renglones que cumplan con las condiciones 
  // especificadas
  // [in]   changes (dictionary): arreglo asociativo que describe los nuevos 
  //        valores a ser ingresados a la tabla
  // [in]   logID (uint): el ID de la bitacora cuyos datos van a ser modificados
  // [in]   questionID (uint): el ID de la caracteristica cuyos datos 
  //        van a ser modificados 
  // [out]  return (uint): el numero de renglones que fueron modificados
  function updateByCapturedLogID($changes, $logID) {
    return parent::update($changes, [
      'AND' => [
        'capture_date_id' => $logID
      ]
    ]);
  }
}

?>
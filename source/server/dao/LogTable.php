<?php

namespace fsm\database;
require_once realpath(dirname(__FILE__)."/InsertableTable.php");


// Un DAO que representa la tabla que almacenara la informacion sobre alguna
// bitacora del sistema
abstract class LogTable extends InsertableTable
{
  // Crea una nueva instancia conectada a la base de datos y asociada con la 
  // tabla del nombre especificado
  function __construct($tableName) {
    parent::__construct($tableName);
  }

  // Retorna una lista de todos los renglones en la tabla que tengan asignado
  // el ID de la fecha de captura especificado
  // [in]   dateID (int): el ID de la fecha en que los datos fueron capturados
  //        en la base de datos
  // [out]  return (dictionary): un arreglo asociativo que contiene los datos 
  //        de la tabla que tengan asignado el ID especificado organizados en 
  //        renglones y columnas
  abstract function selectByCaptureDateID($dateID);
}

?>
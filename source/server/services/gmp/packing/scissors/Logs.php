<?php

namespace fsm\database\gmp\packing\scissors;
require_once realpath(dirname(__FILE__).'/../../../../dao/LogTable.php');
use fsm\database as db;


// Interfaz para la tabla gmp_packing_scissors_logs
class Logs extends db\LogTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gmp_packing_scissors_logs
  function __construct() { 
    parent::__construct('gmp_packing_scissors_logs');
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
        g.id AS id,
        g.name AS name,
        DATE_FORMAT(time, '%H:%i') AS time,
        g.quantity AS quantity,
        was_approved AS approved,
        was_returned AS `condition`,
        corrective_actions AS corrective_action,
        was_sanitized AS is_sanitized
      FROM $this->table
      INNER JOIN gmp_packing_scissors_groups AS g
        ON $this->table.group_id = g.id
      WHERE capture_date_id = $dateID"
    )->fetchAll();
  }
}

?>
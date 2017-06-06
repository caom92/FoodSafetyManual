<?php

namespace fsm\database;
require_once realpath(dirname(__FILE__)."/InsertableTable.php");


// Un DAO que representa una tabla con una columna 'is_active' que indica si sus
// elementos deberian ser leidos de la tabla bajo ciertas condiciones o no; esta
// interfaz incluye un metodo para encender o apagar el valor de esta columna
class ToggableItemsTable extends InsertableTable
{
  // Crea una nueva instancia conectada a la base de datos y asociada con la 
  // tabla del nombre especificado
  function __construct($tableName) {
    parent::__construct($tableName);
  }

  // Cambia el estado de activacion del renglon con el ID especificado entre
  // encendido y apagado
  // [in]   itemID (int): el ID del renglon cuyo estado de activacion sera 
  //        cambiado
  function toggleActivationByID($itemID) {
    parent::$dataBase->query(
      "UPDATE $this->table
      SET is_active = !is_active
      WHERE id = '$itemID'"
    )->fetchAll();
  }
}

?>
<?php

namespace fsm\database;
require_once realpath(dirname(__FILE__)."/ToggableItemsTable.php");


// Un DAO que representa una tabla con una columna 'position' que indica el 
// orden en que los renglones deben ser leidos; incluye un metodo para cambiar
// la posicion de un renglon en la tabla
class OrderedItemsTable extends ToggableItemsTable
{
  // Crea una nueva instancia conectada a la base de datos y asociada con la 
  // tabla del nombre especificado
  function __construct($tableName) {
    parent::__construct($tableName);
  }

  // Cambia la posicion del renglon con el ID especificado por la posicion
  // especificada
  // [in] id (int): el ID del renglon cuya posicion sera cambiada
  // [in] position (int): la nueva posicion que sera asignada al renglon
  // [out] return (int): el numero de columnas que fueron modificadas
  function updatePositionByID($id, $position) {
    return parent::update(
      [ 'position' => $position ], 
      [ 'id' => $id ]
    );
  }
}

?>
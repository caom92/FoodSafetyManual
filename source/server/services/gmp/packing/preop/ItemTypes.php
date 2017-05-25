<?php

namespace fsm\database\gmp\packing\preop;
require_once realpath(dirname(__FILE__).'/../../../../dao/DataBaseTable.php');
use fsm\database as db;


// Interfaz para la tabla item_types
class ItemTypes extends db\DataBaseTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla item_types
  function __construct() { 
    parent::__construct('gmp_packing_preop_item_types');
  }

  // Returns an associative array that contains the info of all the
  // item types
  function selectAll() {
      return parent::select('*');
  }

  // Returns an associative array containing the information of all the 
  // items that are related to the specified area grouped by the item type
  // [in]     areaID: the ID of the area whose items are going to be 
  //          retrieved
  function selectByAreaID($areaID) {
    return parent::$dataBase->query(
      "SELECT 
        i.id AS id, 
        i.is_active AS is_active, 
        i.position AS position, 
        i.name AS name, 
        t.id AS type_id, 
        t.name AS type_name 
      FROM $this->table AS t
      LEFT JOIN gmp_packing_preop_items AS i 
        ON i.type_id = t.id AND i.area_id = $areaID
      ORDER BY area_id, type_id, position"
    )->fetchAll();
  }
}

?>
<?php

namespace fsm\database\gap\packing\preop;
require_once realpath(dirname(__FILE__).'/../../../../dao/InsertableTable.php');
use fsm\database as db;


// Interfaz para la tabla gap_packing_preop_items_log
class ItemLogs extends db\InsertableTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gap_packing_preop_items_log
  function __construct() { 
    parent::__construct('gap_packing_preop_items_log');
  }

  // Retorna todos los renglones que contengan el ID de bitacora de area
  // especificado
  // [in]   areaLogID (uint): el ID de la bitacora de area cuyos renglones van
  //        a ser leidos
  // [out]  return (dictionary): arreglo asociativo que contiene los datos de 
  //        los objetos registrados en la bitacora de area con el ID
  //        especificado organizado en renglones y columnas
  function selectByAreaLogID($areaLogID) {
    return parent::select(
      [
        'a.id(area_id)',
        'a.name(area_name)',
        'i.position', 
        'i.id(item_id)',
        'i.name(item_name)',
        'i.type_id(type_id)',
        'it.en_name(type_name_en)',
        'it.es_name(type_name_es)',
        'is_acceptable',
        'ca.id(corrective_action_id)',
        'ca.code(corrective_action)',
        'comment'  
      ],
      [
        'area_log_id' => $areaLogID,
        'ORDER' => [
          'type_id', 'position'
        ]
      ],
      [
        '[><]gap_packing_preop_corrective_actions(ca)' => [
          'corrective_action_id' => 'id'
        ],
        '[><]gap_packing_preop_items(i)' => [
          'item_id' => 'id'
        ],
        '[><]gap_packing_preop_working_areas(a)' => [
          'i.area_id' => 'id'
        ],
        '[><]gap_packing_preop_item_types(it)' => [
          'i.type_id' => 'id'
        ]
      ]
    );
  }

  // Modifica los renglones de la tabla que tienen registrado el ID de fecha de 
  // captura especificado, sustituyendo los viejos datos con los datos
  // especificados
  // [in]   changes (dictionary): arreglo asociativo que contiene los datos que 
  //        van a ser añadidos en la tabla organizados por columnas
  // [in]   logID (uint): el ID de fecha de captura cuyo renglon en la tabla
  //        va a ser modificado
  // [out]  return (uint): el numero de renglones que fueron modificados
  function updateByCapturedLogIDAndItemID($changes, $logID, $itemID) {
    return parent::$dataBase->query(
      "UPDATE 
        $this->table
      INNER JOIN gap_packing_preop_areas_log AS a
        ON area_log_id = a.id
      INNER JOIN captured_logs AS cl
        ON a.capture_date_id = cl.id
      SET 
        is_acceptable = {$changes['is_acceptable']},
        corrective_action_id = {$changes['corrective_action_id']},
        comment = '{$changes['comment']}'
      WHERE cl.id = $logID AND item_id = $itemID"
    );
  }

  // para depuracion del query de insert de esta tabla unicamente 
  // function insert($rows) {
  //   return parent::$dataBase->debug()->insert($this->table, $rows);
  // }
}

?>
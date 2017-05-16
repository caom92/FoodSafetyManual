<?php

namespace fsm\database\gmp\packing\finishedProduct;
require_once realpath(dirname(__FILE__).'/../../../../dao/LogTable.php');
use fsm\database as db;


// Interfaz para la tabla gmp_packing_finished_product_logs
class Logs extends db\LogTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gmp_packing_finished_product_logs
  function __construct() { 
    parent::__construct('gmp_packing_finished_product_logs');
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
        'a.name(production_area)',
        's.code(supplier)',
        'p.code(product)',
        'i.company_name(customer)',
        'q.name(quality)',
        'origin',
        'expiration_date',
        'water_temperature',
        'product_temperature',
        'is_weight_correct',
        'is_label_correct',
        'is_trackable',
        'notes'
      ],
      [
        'capture_date_id' => $dateID
      ],
      [
        '[><]gmp_packing_finished_product_production_areas(a)' => [
          'production_area_id' => 'id'
        ],
        '[><]suppliers(s)' => [
          'supplier_id' => 'id'
        ],
        '[><]product(p)' => [
          'product_id' => 'id'
        ],
        '[><]customers(c)' => [
          'customer_id' => 'id'
        ],
        '[><]contact_info(i)' => [
          'c.contact_info_id' => 'id'
        ],
        '[><]quality_types(q)' => [
          'quality_type_id' => 'id'
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
  function updateByCapturedLogID($changes, $logID) {
      return parent::update($changes, ['capture_date_id' => $logID]);
  }
}

?>
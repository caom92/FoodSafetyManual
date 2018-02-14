<?php

namespace fsm\database\gmp\packing\finishedProduct;
require_once realpath(dirname(__FILE__).'/../../../../dao/InsertableTable.php');
use fsm\database as db;


// Interfaz para la tabla gmp_packing_finished_product_production_areas
class ProductionAreas extends db\InsertableTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gmp_packing_finished_product_production_areas
  function __construct() { 
    parent::__construct('gmp_packing_finished_product_production_areas');
  }
  
  // Retorna una lista de todos los renglones que tengan registrados el 
  // ID de la zona especificada
  // [in]   zoneID (uint): el ID de la zona cuyas areas de produccion vamos a
  //        leer
  // [out]  return (dictionary): arreglo asociativo que contiene los datos de
  //        las areas de produccion recuperadas organizados por renglones y
  //        columnas
  function selectByZoneID($zoneID)
  {
    return parent::select(
      [ "id", "name" ],
      [ "zone_id" => $zoneID ]
    );
  }
}

?>
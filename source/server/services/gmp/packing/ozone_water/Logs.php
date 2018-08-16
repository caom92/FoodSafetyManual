<?php

namespace fsm\database\gmp\packing\ozone;
require_once realpath(dirname(__FILE__).'/../../../../dao/LogTable.php');
use fsm\database as db;


// Interfaz para la tabla gmp_packing_ozone_water_log
class Logs extends db\LogTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla gmp_packing_ozone_water_log
  function __construct() { 
    parent::__construct('gmp_packing_ozone_water_log');
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
        'm.id(id)',
        'm.name(name)',
        'voltage(reading)',
        'potential_hydrogen(ph)',
        'reduction_potential(orp)',
        'temperature',
        'corrective_actions(corrective_action)',
        'product',
        'lot',
        'crop(parcel)',
        'batch(reference)',
        'total_chlorine',
        'free_chlorine',
        'rinse',
        'was_test_passed(status)'
      ],
      [
        'capture_date_id' => $dateID,
        'ORDER' => [
          'm.position'
        ]
      ],
      [
        '[><]gmp_packing_ozone_water_machines(m)' => [
          'machine_id' => 'id'
        ]
      ]
    );
  }

  function updateByCapturedLogIDAndMachineID(
    $changes, $logID, $machineID
  ) {
    return parent::update($changes, [
      'AND' => [
        'capture_date_id' => $logID,
        'machine_id' => $machineID
      ]
    ]);
  }
}

?>
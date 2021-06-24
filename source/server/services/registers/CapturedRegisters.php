<?php

namespace fsm\database;
require_once realpath(dirname(__FILE__).'/../../dao/InsertableTable.php');
use fsm\database as db;

// Interfaz para la tabla captured_registers
class CapturedRegisters extends db\InsertableTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla captured_registers
  function __construct() { 
    parent::__construct('captured_registers');
  }

  // Obtiene el ID de empleado a partir del ID del registro capturado
  function selectSubmitterIDByID($capturedRegisterID) {
    $rows = parent::get(
      ['submitter_id'], 
      ['id' => $capturedRegisterID]
    );

    return (count($rows) > 0) ? $rows['submitter_id'] : NULL;
  }

  // Firma el registro por parte del supervisor asignado del empleado
  function approveRegisterBySupervisor($capturedRegisterID, $supervisorID, $date) {
    return parent::update(
      [
        'supervisor_id' => $supervisorID,
        'approval_date' => $date
      ],
      [ 'id' => $capturedRegisterID ]
    );
  }

  // Firma el registro por parte del supervisor de buenas prácticas asignado
  // para la zona
  function approveRegisterByGPSupervisor($capturedRegisterID, $gpSupervisorID, $date) {
    return parent::update(
      [ 
        'gp_supervisor_id' => $gpSupervisorID,
        'gp_approval_date' => $date
      ],
      [ 'id' => $capturedRegisterID ]
    );
  }

  // Realiza un borrado lógico del registro
  function deleteRegisterByID($capturedRegisterID) {
    return parent::update(
      [ 'is_active' => 0 ], 
      [ 'id' => $capturedRegisterID ]
    );
  }

  // Revisa si un registro ha sido aprobado por un supervisor
  function isApprovedBySupervisor($capturedRegisterID) {
    $rows = parent::get(
      [ 'supervisor_id' ], 
      [ 'id' => $capturedRegisterID ]
    );

    return $rows['supervisor_id'] != NULL ? 1 : 0;
  }

  // Obtiene el ID de la zona a partir del ID del registro capturado
  function selectZoneIDByID($capturedRegisterID) {
    $rows = parent::get(
      [ 'zone_id' ], 
      [ 'id' => $capturedRegisterID ]
    );

    return (count($rows) > 0) ? $rows['zone_id'] : NULL;
  }

  function countUnsignedRegistersByUserID($userID) {
    return parent::count(
      [
        'AND' => [
          'submitter_id' => $userID,
          'supervisor_id' => NULL
        ]
      ]
    );
  }

  function countUnsignedRegistersByUserIDAndRegisterID($userID, $registerID) {
    return parent::count(
      [
        'AND' => [
          'submitter_id' => $userID,
          'register_id' => $registerID,
          'supervisor_id' => NULL
        ]
      ]
    );
  }

  function countGpUnsignedRegistersByZoneID($zoneID) {
    return parent::count(
      [
        'AND' => [
          'zone_id' => $zoneID,
          'gp_supervisor_id' => NULL
        ]
      ]
    );
  }

  function countGpUnsignedRegistersByZoneIDAndRegisterID($zoneID, $registerID) {
    return parent::count(
      [
        'AND' => [
          'zone_id' => $zoneID,
          'register_id' => $registerID,
          'gp_supervisor_id' => NULL
        ]
      ]
    );
  }

  function updateByID($changes, $capturedRegisterID) {
    return parent::update(
      $changes, 
      [
        'id' => $capturedRegisterID
      ]
    );
  }

  function selectByID($capturedRegisterID) {
    return parent::select(
      '*',
      [
        'id' => $capturedRegisterID
      ]
    )[0];
  }
}

?>
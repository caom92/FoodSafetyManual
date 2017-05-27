<?php

namespace fsm\database;
require_once realpath(dirname(__FILE__).'/../../dao/InsertableTable.php');
use fsm\database as db;


// Interfaz para la tabla captured_logs
class CapturedLogs extends db\InsertableTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla captured_logs
  function __construct() { 
    parent::__construct('captured_logs');
  }

  // Retorna una lista de los renglones que tengan registrados los IDs de
  // bitacora y zona especificados y que cuya fecha de captura se encuentre
  // dentro del intervalo especificado
  // [in]   startDate (string): limite inferior del intervalo de fechas a buscar
  // [in]   endDate (string): limite superior del intervalo de fechas a buscar
  // [in]   logID (uint): ID de la bitacora cuyos registros van a ser leidos
  // [in]   zoneID (uint): ID de la zona cuyos registros van a ser leidos
  // [out]  return (dictionary): arreglo asociativo que contiene los datos de 
  //        capturados dentro del intervalo de fechas dado y de la bitacora
  //        y zona especificados organizados en renglones y columnas y agrupados
  //        por fecha
  function selectByDateIntervalLogIDAndZoneID(
    $startDate, 
    $endDate, 
    $logID, 
    $zoneID
  ) {
    return parent::select(
      [
        "$this->table.id(id)",
        'capture_date',
        'employee_id',
        'approval_date',
        'supervisor_id',
        'extra_info1',
        'extra_info2'
      ], 
      [
        'AND' => [
          'log_id' => $logID, 
          'capture_date[>=]' => $startDate,
          'capture_date[<=]' => $endDate,
          'u.zone_id' => $zoneID
        ],
        'ORDER' => [
          'capture_date'
        ]
      ],
      [
        '[><]users(u)' => [
          'employee_id' => 'id'
        ]
      ]
    );
  }

  // Retorna una lista de los renglones que tengan registrados los IDs de
  // bitacora y zona especificados y que cuyo ID sea el especificado
  // [in]   reportID (uint): el ID del reporte cuyos registros van a ser leidos
  // [in]   logID (uint): ID de la bitacora cuyos registros van a ser leidos
  // [in]   zoneID (uint): ID de la zona cuyos registros van a ser leidos
  // [out]  return (dictionary): arreglo asociativo que contiene los datos de 
  //        capturados dentro del intervalo de fechas dado y de la bitacora
  //        y zona especificados organizados en renglones y columnas y agrupados
  //        por fecha
  function selectByIDLogIDAndZoneID(
    $reportID,
    $logID, 
    $zoneID
  ) {
    return parent::select(
      [
        "$this->table.id(id)",
        'capture_date',
        'employee_id',
        'approval_date',
        'supervisor_id',
        'extra_info1',
        'extra_info2'
      ], 
      [
        'AND' => [
          "$this->table.id" => $reportID,
          'log_id' => $logID, 
          'u.zone_id' => $zoneID
        ],
        'ORDER' => [
          'capture_date'
        ]
      ],
      [
        '[><]users(u)' => [
          'employee_id' => 'id'
        ]
      ]
    );
  }

  // Revisa si hay renglones en la tabla que tengan registrados la
  // fecha y ID de zona y bitacora especificados
  // [in]   date (string): la fecha cuyas bitacoras van a ser buscadas
  // [in]   logID (uint): el ID de la bitacora que va a ser buscada
  // [in]   zoneID (uint): el ID de la zona cuyas bitacoras van a ser buscadas
  // [out]  return (boolean): verdadero o falso dependiendo si habia renglones
  //        en la tabla que tenian registrados los datos especificados o no
  function hasByDateAndLogID($date, $logID, $zoneID) {
    return parent::has(
      [
        'AND' => [
          'capture_date' => $date,
          'log_id' => $logID,
          'u.zone_id' => $zoneID
        ]
      ],
      [
        '[><]users(u)' => [
          'employee_id' => 'id'
        ]
      ]
    );
  }

  // Retorna una lista de todos los renglones cuyos campos de aprovacion esten
  // asignados como falso y que ademas tengan registrado el ID de usuario 
  // especificado
  // [in]   userID (uint): el ID de usuario cuyas bitacoras van a ser buscadas
  // [out]  return (dictionary): un arreglo asociativo que contiene los datos 
  //        de todas las bitacoras no aprovadas que esten registrados al usuario
  //        con el ID especificado
  function selectUnapprovedLogsByUserID($userID) {
    return parent::$dataBase->query(
      "SELECT 
        t.id AS captured_log_id,
        s.id AS status_id,
        s.name AS status_name,
        p.name AS program_name,
        m.name AS module_name,
        l.name AS log_name,
        t.employee_id AS employee_id,
        u.employee_num AS employee_num,
        u.first_name,
        u.last_name,
        t.capture_date AS capture_date,
        l.name_suffix AS service_name
      FROM 
        $this->table AS t
      INNER JOIN
        log_status AS s
        ON t.status_id = s.id
      INNER JOIN 
        logs AS l
        ON t.log_id = l.id
      INNER JOIN 
        modules AS m
        ON l.module_id = m.id
      INNER JOIN
        programs AS p
        ON m.program_id = p.id
      INNER JOIN
        users AS u
        ON t.employee_id = u.id
      WHERE
        t.employee_id = $userID AND
        t.status_id != (
          SELECT id FROM log_status WHERE name = ".
          parent::$dataBase->quote('Approved')."
        )
      ORDER BY t.status_id, t.capture_date"
    )->fetchAll();
  }

  // Retorna el ID de usuario registrado en el primer renglon encontrado que
  // tenga registrado el ID de bitacora especificado
  // [in]   logID (uint): el ID de la bitacora que va a ser buscada
  // [out]  return (uint): el ID de usuario que tenia registrado la bitacora
  //        especificada
  function selectUserIDByID($logID) {
    $rows = parent::get(
      ['employee_id'], 
      ['id' => $logID]
    );
    return (count($rows) > 0) ? $rows['employee_id'] : NULL;
  }

  // Modifica los renglones que tengan registrado el ID de bitacora y la fecha
  // especificada para asignar el valor de su campo de activacion como verdadero
  // [in]   logID (uint): el ID de la bitacora cuyos renglones van a ser 
  //        modificados
  // [in]   date (string): fecha cuyas bitacoras van a ser modificadas
  // [out]  return (uint): el numero de renglones modificados
  function updateStatusToApprovedByID($logID, $date) {
    return parent::$dataBase->query(
      "UPDATE 
        $this->table 
        SET 
          supervisor_id = {$_SESSION['user_id']},
          approval_date = ".parent::$dataBase->quote($date).",
          status_id = (
            SELECT id FROM log_status WHERE name = ".
            parent::$dataBase->quote('Approved')."
          )
        WHERE 
          id = $logID"
    );
  }

  // Modifica los renglones que tengan registrado el ID de bitacora
  // especificado para asignar el valor de su columna de estado a 'rechazado'
  // [in]   logID (uint): el ID de la bitacora cuyos renglones van a ser 
  //        modificados
  // [out]  return (uint): el numero de renglones que fueron modificados
  function updateStatusToRejectedByID($logID) {
    return parent::$dataBase->query(
      "UPDATE 
        $this->table 
        SET 
          status_id = (
            SELECT id FROM log_status WHERE name = ".
            parent::$dataBase->quote('Rejected')."
          )
        WHERE 
          id = $logID"
    );
  }

  // Retorna el estado del primer renglon que tenga registrado el ID de bitacora
  // especificado
  // [in]   logID (uint): el ID de la bitacora cuyos renglones van a ser leidos
  // [out]  return (string): el nombre del estado registrado para la bitacora
  //        especificada
  function getStatusByID($logID) {
    $rows = parent::select(
      ['s.name(status)'], 
      ["$this->table.id" => $logID],
      ['[><]log_status(s)' => ['status_id' => "id"]]
    );
    return (count($rows) > 0) ? $rows[0]['status'] : NULL;
  }

  // Cuenta el numero de renglones que tengan registrado el ID de usuario 
  // especificado
  // [in]   userID (uint): el ID de usuario cuyos renglones van a ser contados
  // [out]  return (uint): el numero de renglones que tenian registrado el
  //        usuario especificado
  function countUnapprovedLogsByUserID($userID) {
    $num = parent::$dataBase->query(
      "SELECT 
        COUNT(*)
      FROM 
        $this->table
      WHERE
        employee_id = $userID AND
        status_id != (
          SELECT id FROM log_status WHERE name = ".
          parent::$dataBase->quote('Approved')."
        )"
    )->fetchAll();

    return $num[0][0];
  }

  // Modifica los datos del renglon con el ID especificado sustituyendo sus
  // datos con los datos especificados
  // [in]   changes (dictionary): los datos a ser ingresados en la tabla 
  //        organizados en renglones y columnas
  // [in]   id (uint): el ID del renglon cuyos datos van a ser modificados
  // [out]  return (uint): el numero de renglones que fueron modificados
  function updateByID($changes, $id) {
    return parent::update($changes, ['id' => $id]);
  }
}

?>
<?php

namespace fsm\database;
require_once realpath(dirname(__FILE__).'/../../dao/DataBaseTable.php');
use fsm\database as db;


// Interfaz para la tabla supervisors_employees
class SupervisorsEmployees extends db\DataBaseTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla supervisors_employees
  function __construct() { 
    parent::__construct('supervisors_employees');
  }

  // Returns a list of employee users that are assigned to the user with the 
  // especified ID
  function selectEmployeesBySupervisorID($supervisorID) {
    return parent::select(
      ['u.id', 'u.employee_num', 'u.login_name' ,'u.first_name', 'u.last_name'],
      [
        'AND' => [
          'supervisor_id' => $supervisorID,
          'u.is_active[!]' => FALSE
        ]
      ],
      ['[><]users(u)' => [
        'employee_id' => 'id'
      ]]
    );
  }

  // Returns the ID of the supervisor assigned to the user with the 
  // especified user ID
  function getSupervisorIDByUserID($userID) {
    $rows = parent::get(
      ['supervisor_id'], 
      ['employee_id' => $userID]
    );
    return (count($rows) > 0) ? $rows['supervisor_id'] : NULL;
  }

  // Inserts the especified data to the table in the database
  function insert($row) {
    return parent::$dataBase->query(
      "INSERT INTO $this->table (supervisor_id, employee_id)
      VALUES ({$row['supervisor_id']}, {$row['employee_id']})
      ON DUPLICATE KEY UPDATE 
      supervisor_id = {$row['supervisor_id']}"
    );
  }

  // Returns the number of rows that comply to the especified where query
  function getNumEmployeesBySupervisorID($supervisorID) {
    return parent::count(['supervisor_id' => $supervisorID]);
  }

  // Checks if there is an entry in the table with the especified supervisor 
  // and employee IDs, returning true if this is the case or false otherwise
  function hasSupervisorAndEmployeeID($supervisorID, $employeeID) {
    return parent::has(['AND' => [
      'supervisor_id' => $supervisorID,
      'employee_id' => $employeeID
    ]]);
  }

  // Checks if there is an entry in the table that has the especified employee
  // ID, indicating that that employee has a supervisor assigend
  function hasEmployeeID($userID) {
    return parent::has(['employee_id' => $userID]);
  }

  // Deletes the relationship that has the especified employee ID
  function deleteByEmployeeID($employeeID) {
    return parent::delete([ 'employee_id' => $employeeID]);
  }
}

?>
<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataAccessObject.php");

use fsm\database as db;

// Data Access Object for the supervisors_employees table
class SupervisorsEmployeesDAO extends DataAccessObject
{
    // Creates an interface for interacting with the 
    // supervisors_employees table in the specified data base
    function __construct()
    {
        parent::__construct("supervisors_employees");
    }


    // Returns a list of employee users that are assigned to the user with the 
    // especified ID
    function selectEmployeesBySupervisorID($supervisorID)
    {
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
    function getSupervisorIDByUserID($userID)
    {
        $rows = parent::get(
            ['supervisor_id'], 
            ['employee_id' => $userID]
        );
        return (count($rows) > 0) ? $rows['supervisor_id'] : NULL;
    }


    // Inserts the especified data to the table in the database
    function insert($row)
    {
        return parent::$dataBase->query(
            "INSERT INTO $this->table (supervisor_id, employee_id)
            VALUES ({$row['supervisor_id']}, {$row['employee_id']})
            ON DUPLICATE KEY UPDATE 
            supervisor_id = {$row['supervisor_id']}"
        );
    }


    // Returns the number of rows that comply to the especified where query
    function count($where)
    {
        return parent::count($where);
    }
}

?>
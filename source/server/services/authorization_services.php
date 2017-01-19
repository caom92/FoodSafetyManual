<?php

// Namespace for the services that correspond to the log authorization by the
// supervisor
namespace fsm\services\authorizations;

// Import the required files
require_once realpath(dirname(__FILE__).'/../data_validations.php');
require_once realpath(dirname(__FILE__).'/../dao/UsersDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/SupervisorsEmployeesDAO.php');

// Shorthands for the namespaces
use fsm\database as db;
use fsm\validations as val;


// Returns a list of all the supervisors in the especified zone
function getSupervisorsOfZone()
{
    // first connect to the database and retrieve the supervisor list
    $users = new db\UsersDAO();
    $rows = $users->selectSupervisorsNameByZoneID($_POST['zone_id']);

    // temporal storage for the list of supervisors to return to the user
    $supervisors = [];

    // prepare the final supervisor list
    foreach ($rows as $row) {
        array_push($supervisors, [
            'id' => $row['id'],
            'full_name' => "{$row['first_name']} {$row['last_name']}"
        ]);
    }

    // return it to the user
    return $supervisors;
}


// Returns a list of employee users that are assigned to the supervisor user 
// with the especified ID
function getEmployeesOfSupervisor()
{
    $assignments = new db\SupervisorsEmployeesDAO();
    return $assignments->selectEmployeesBySupervisorID(
        $_POST['supervisor_id']
    );
}


// Assigns employees to their corresponding supervisors
function assignEmployeesToSupervisors()
{
    // first, we need to check the input data
    foreach ($_POST['assignments'] as $assignment) {
        // check if the user sent the appropiate data
        $isEmployeeIDValid = 
            isset($assignment['employee_id'])
            && array_key_exists('employee_id', $assignment);

        $isSupervisorIDValid = 
            isset($assignment['supervisor_id'])
            && array_key_exists('supervisor_id', $assignment);

        // if not, notify the user
        if (!$isEmployeeIDValid || !$isSupervisorIDValid) {
            throw new \Exception(
                'Assignments array does not have the proper keys'
            );
        } else {
            // if the user sent the data, check that it is of the proper type
            $isSupervisorIDValid = val\isInteger($assignment['supervisor_id']);
            $isEmployeeIDValid = val\isInteger($assignment['employee_id']);

            // if not, notify the user
            if (!$isEmployeeIDValid || !$isSupervisorIDValid) {
                throw new \Exception(
                    'A user ID is not an integer in one of the assignments'
                );
            }
        }

        // connect to the users table in the data base
        $users = new db\UsersDAO();

        // check if the supervisor has the proper role
        $isSupervisorRole = 
            $users->getRoleByID($assignment['supervisor_id']) == 'Supervisor';

        // check if the employee has the proper role
        $isEmployeeRole =
            $users->getRoleByID($assignment['employee_id']) == 'Employee';

        // if the users do not have the proper role, notify the user
        if (!$isSupervisorRole || !$isEmployeeRole) {
            throw new \Exception(
                'The users do not have the proper roles for one of the '.
                'assignments'
            );
        }

        // check if the users share the same zone
        $haveSameZone = 
            $users->getZoneIDByID($assignment['supervisor_id']) ==
            $users->getZoneIDByID($assignment['employee_id']);

        // if the users are not in the same zone, notify the user
        if (!$haveSameZone) {
            throw new \Exception(
                'The users do not share the same zone for one of the '.
                'assignments'
            );
        }
    }

    // if the data is correct, connect to the data base
    $assignments = new db\SupervisorsEmployeesDAO();

    // insert each assignment
    foreach ($_POST['assignments'] as $assignment) {
        $assignments->insert($assignment);
    }

    return [];
}

?>
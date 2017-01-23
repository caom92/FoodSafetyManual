<?php

// Namespace for the services that correspond to the log authorization by the
// supervisor
namespace fsm\services\authorizations;

// Import the required files
require_once realpath(dirname(__FILE__).'/../data_validations.php');
require_once realpath(dirname(__FILE__).'/../dao/UsersDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/SupervisorsEmployeesDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/CapturedLogsDAO.php');

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


// Returns a list of all the unapproved logs that the supervisor with the 
// especified ID has
function getUnapprovedLogsOfSupervisor()
{
    // first, connect to the data base
    $capturedLogs = new db\CapturedLogsDAO();
    $assignments = new db\SupervisorsEmployeesDAO();

    // then, get the list of employees that the supervisor has assigned
    $employees = 
        $assignments->selectEmployeesBySupervisorID($_POST['supervisor_id']);

    // perpare the final storage where the unapproved logs will be stored
    $supervisorLogs = [
        'waiting' => [
            'id' => 0,
            'name' => 'Waiting',
            'logs' => []
        ],
        'rejeted' => [
            'id' => 0,
            'name' => 'Rejected',
            'logs' => []
        ]
    ];

    // for each employee assigned to the supervisor...
    foreach ($employees as $employee) {
        // get the unapproved logs that where captured by the employee
        $employeeLogs =    
            $capturedLogs->selectUnapprovedLogsByUserID($employee['id']);
        
        // push every unapproved log to the final storage
        foreach ($employeeLogs as $log) {
            // check if the status of the log is waiting
            if ($log['status_name'] == 'Waiting') {
                // if the status ID is not stored yet, store it
                if ($supervisorLogs['waiting']['id'] == 0) {
                    $supervisorLogs['waiting']['id'] = $log['status_id'];
                }

                // push the log to the waiting array
                array_push($supervisorLogs['waiting']['logs'], [
                    'captured_log_id' => $log['captured_log_id'],
                    'program_name' => $log['program_name'],
                    'module_name' => $log['module_name'],
                    'log_name' => $log['log_name'],
                    'employee_id' => $log['employee_id'],
                    'employee_num' => $log['employee_num'],
                    'first_name' => $log['first_name'],
                    'last_name' => $log['last_name'],
                    'capture_date' => $log['capture_date'],
                    'service_name' => $log['service_name']
                ]);
            } else {
                // if the status is Rejected, store the ID if it is not stored 
                // yet
                if ($supervisorLogs['rejected']['id'] == 0) {
                    $supervisorLogs['rejected']['id'] = $log['status_id'];
                }

                // push the log to the rejected array
                array_push($supervisorLogs['rejected']['logs'], [
                    'captured_log_id' => $log['captured_log_id'],
                    'program_name' => $log['program_name'],
                    'module_name' => $log['module_name'],
                    'log_name' => $log['log_name'],
                    'employee_id' => $log['employee_id'],
                    'employee_num' => $log['employee_num'],
                    'first_name' => $log['first_name'],
                    'last_name' => $log['last_name'],
                    'capture_date' => $log['capture_date'],
                    'service_name' => $log['service_name']
                ]);
            }
        }
    }

    // return the list of unapproved logs of the supervisor
    return $supervisorLogs;
}


// Returns a list of all the unapproved logs that an employee has
function getUnapprovedLogsOfEmployee()
{
    // first, connect to the data base
    $capturedLogs = new db\CapturedLogsDAO();
    
    // prepare the temporal storage for the final logs array
    $employeeLogs = [
        'waiting' => [
            'id' => 0,
            'name' => 'Waiting',
            'logs' => []
        ],
        'rejeted' => [
            'id' => 0,
            'name' => 'Rejected',
            'logs' => []
        ]
    ];

    // retrieve from the database the unapproved logs
    $unapprovedLogs = 
        $capturedLogs->selectUnapprovedLogsByUserID($_POST['employee_id']);

    // store each one of them in the final storage
    foreach ($unapprovedLogs as $log) {
        // check if the status of the log is waiting
        if ($log['status_name'] == 'Waiting') {
            // if the status ID is not stored yet, store it
            if ($supervisorLogs['waiting']['id'] == 0) {
                $supervisorLogs['waiting']['id'] = $log['status_id'];
            }

            // push the log to the waiting array
            array_push($supervisorLogs['waiting']['logs'], [
                'captured_log_id' => $log['captured_log_id'],
                'program_name' => $log['program_name'],
                'module_name' => $log['module_name'],
                'log_name' => $log['log_name'],
                'capture_date' => $log['capture_date'],
                'service_name' => $log['service_name']
            ]);
        } else {
            // if the status is Rejected, store the ID if it is not stored 
            // yet
            if ($supervisorLogs['rejected']['id'] == 0) {
                $supervisorLogs['rejected']['id'] = $log['status_id'];
            }

            // push the log to the rejected array
            array_push($supervisorLogs['rejected']['logs'], [
                'captured_log_id' => $log['captured_log_id'],
                'program_name' => $log['program_name'],
                'module_name' => $log['module_name'],
                'log_name' => $log['log_name'],
                'capture_date' => $log['capture_date'],
                'service_name' => $log['service_name']
            ]);
        }
    }

    // return the resulting array
    return $employeeLogs;
}


// Returns the number of employees that the supervisor with the especified ID 
// has assigned
function getNumEmployeesOfSupervisor()
{
    $assignments = new db\SupervisorsEmployeesDAO();
    return $assignments->getNumEmployeesBySupervisorID($_POST['supervisor_id']);
}


// Marks the status of the especified log as 'Approved'
function approveLog()
{
    // first, connect to the data base
    $capturedLogs = new db\CapturedLogsDAO();
    $assignments = new db\SupervisorsEmployeesDAO();

    // check if the user that captured the log is assigned to the supervisor
    $employeeID = $capturedLogs->selectUserIDByID($_POST['captured_log_id']);
    $hasEmployeeAssigned = 
        $assignments->hasSupervisorAndEmployeeID($_SESSION['id'], $employeeID);
    
    // if the user is not assigned to the supervisor, prevent the update and
    // notify the user
    if (!$hasEmployeeAssigned) {
        throw new \Exception(
            'This supervisor is not allowed to authorize this log; the '.
            'employee that captured the log is not assigned to her.'
        );
    }

    // if the supervisor is authorized to approve this log, update the log 
    // status
    $capturedLogs->updateStatusToApprovedByID($_POST['captured_log_id']);
}


// Marks the status of the especified log as 'Rejected'
function rejectLog()
{
    // first, connect to the data base
    $capturedLogs = new db\CapturedLogsDAO();
    $assignments = new db\SupervisorsEmployeesDAO();

    // check if the user that captured the log is assigned to the supervisor
    $employeeID = $capturedLogs->selectUserIDByID($_POST['captured_log_id']);
    $hasEmployeeAssigned = 
        $assignments->hasSupervisorAndEmployeeID($_SESSION['id'], $employeeID);
    
    // if the user is not assigned to the supervisor, prevent the update and
    // notify the user
    if (!$hasEmployeeAssigned) {
        throw new \Exception(
            'This supervisor is not allowed to reject this log; the '.
            'employee that captured the log is not assigned to her.'
        );
    }

    // check if the log is already approved
    $isApproved = 
        $capturedLogs->getStatusByID($_POST['captured_log_id']) == 'Approved';
    if ($isApproved) {
        // if it is, prevent the status change and notify the user
        throw new \Exception(
            'The log is already approved and it cannot be changed.'
        );
    }

    // if the supervisor is authorized to approve this log, update the log 
    // status
    $capturedLogs->updateStatusToRejectedByID($_POST['captured_log_id']);
}

?>
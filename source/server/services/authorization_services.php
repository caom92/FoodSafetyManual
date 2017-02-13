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


$authorizationServices = [
    'list-supervisors-by-zone' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'zone_id' => [
                'type' => 'int',
                'min' => 1
            ]
        ],
        'callback' => 'fsm\services\authorizations\getSupervisorsOfZone'
    ],
    'list-employees-of-supervisor' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'supervisor_id' => [
                'type' => 'int',
                'min' => 1
            ]
        ],
        'callback' => 'fsm\services\authorizations\getEmployeesOfSupervisor'
    ],
    'assign-employees-to-supervisors' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'assignments' => [
                'type' => 'array'
            ]
        ],
        'callback' => 'fsm\services\authorizations\assignEmployeesToSupervisors'
    ],
    'list-unapproved-logs-of-user' => [
        'requirements_desc' => [
            'logged_in' => ['Supervisor', 'Employee']
        ],
        'callback' => 
            'fsm\services\authorizations\getUnapprovedLogsOfUser'
    ],
    'get-supervisor-num-of-employees' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'supervisor_id' => [
                'type' => 'int',
                'min' => 1
            ]
        ],
        'callback' => 'fsm\services\authorizations\getNumEmployeesOfSupervisor'
    ],
    'approve-log' => [
        'requirements_desc' => [
            'logged_in' => ['Supervisor'],
            'captured_log_id' => [
                'type' => 'int',
                'min' => 1
            ],
            'date' => [
                'type' => 'datetime',
                'format' => 'Y-m-d'
            ]
        ],
        'callback' => 'fsm\services\authorizations\approveLog'
    ],
    // 'reject-log' => [
    //     'requirements_desc' => [
    //         'logged_in' => ['Supervisor'],
    //         'captured_log_id' => [
    //             'type' => 'int',
    //             'min' => 1
    //         ]
    //     ],
    //     'callback' => 'fsm\services\authorizations\rejectLog'
    // ],
    'get-num-pending-logs' => [
        'requirements_desc' => [
            'logged_in' => ['Supervisor']
        ],
        'callback' => 'fsm\services\authorizations\countPendingLogs'
    ]
];

// Returns a list of all the supervisors in the especified zone
function getSupervisorsOfZone($request)
{
    // first connect to the database and retrieve the supervisor list
    $users = new db\UsersDAO();
    $rows = $users->selectSupervisorsNameByZoneID($request['zone_id']);

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
function getEmployeesOfSupervisor($request)
{
    $assignments = new db\SupervisorsEmployeesDAO();
    return $assignments->selectEmployeesBySupervisorID(
        $request['supervisor_id']
    );
}


// Assigns employees to their corresponding supervisors
function assignEmployeesToSupervisors($request)
{
    // first, we need to check the input data
    foreach ($request['assignments'] as $assignment) {
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
    foreach ($request['assignments'] as $assignment) {
        $assignments->insert($assignment);
    }

    return [];
}


// Returns a list of all the unapproved logs that a user has
function getUnapprovedLogsOfUser($request)
{
    // first, connect to the data base
    $capturedLogs = new db\CapturedLogsDAO();
    $assignments = new db\SupervisorsEmployeesDAO();

    // prepare the temporal storage for the final logs array
    $userLogs = [
        'waiting' => [
            'id' => 0,
            'name' => 'Waiting',
            'logs' => []
        ],
        'rejected' => [
            'id' => 0,
            'name' => 'Rejected',
            'logs' => []
        ]
    ];

    // check if the user is an administrator
    if ($_SESSION['role_name'] === 'Supervisor') {
        // then, get the list of employees that the supervisor has assigned
        $employees = 
            $assignments->selectEmployeesBySupervisorID($_SESSION['user_id']);

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
                    if ($userLogs['waiting']['id'] == 0) {
                        $userLogs['waiting']['id'] = $log['status_id'];
                    }

                    // push the log to the waiting array
                    array_push($userLogs['waiting']['logs'], [
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
                    // if the status is Rejected, store the ID if it is not 
                    // stored yet
                    if ($userLogs['rejected']['id'] == 0) {
                        $userLogs['rejected']['id'] = $log['status_id'];
                    }

                    // push the log to the rejected array
                    array_push($userLogs['rejected']['logs'], [
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
    } else {
        // if the user is not a supervisor, it means it is an employee

        // retrieve from the database the unapproved logs
        $unapprovedLogs = 
            $capturedLogs->selectUnapprovedLogsByUserID($_SESSION['user_id']);

        // store each one of them in the final storage
        foreach ($unapprovedLogs as $log) {
            // check if the status of the log is waiting
            if ($log['status_name'] == 'Waiting') {
                // if the status ID is not stored yet, store it
                if ($userLogs['waiting']['id'] == 0) {
                    $userLogs['waiting']['id'] = $log['status_id'];
                }

                // push the log to the waiting array
                array_push($userLogs['waiting']['logs'], [
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
                if ($userLogs['rejected']['id'] == 0) {
                    $userLogs['rejected']['id'] = $log['status_id'];
                }

                // push the log to the rejected array
                array_push($userLogs['rejected']['logs'], [
                    'captured_log_id' => $log['captured_log_id'],
                    'program_name' => $log['program_name'],
                    'module_name' => $log['module_name'],
                    'log_name' => $log['log_name'],
                    'capture_date' => $log['capture_date'],
                    'service_name' => $log['service_name']
                ]);
            }
        }
    }

    // return the resulting array of logs to the user
    return $userLogs;
}


// Returns the number of employees that the supervisor with the especified ID 
// has assigned
function getNumEmployeesOfSupervisor($request)
{
    $assignments = new db\SupervisorsEmployeesDAO();
    return $assignments->getNumEmployeesBySupervisorID($request['supervisor_id']);
}


// Marks the status of the especified log as 'Approved'
function approveLog($request)
{
    // first, connect to the data base
    $capturedLogs = new db\CapturedLogsDAO();
    $assignments = new db\SupervisorsEmployeesDAO();

    // check if the user that captured the log is assigned to the supervisor
    $employeeID = $capturedLogs->selectUserIDByID($request['captured_log_id']);
    $hasEmployeeAssigned = $assignments->hasSupervisorAndEmployeeID(
        $_SESSION['user_id'], 
        $employeeID
    );
    
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
    $capturedLogs->updateStatusToApprovedByID(
        $request['captured_log_id'],
        $request['date']
    );
}


// Marks the status of the especified log as 'Rejected'
function rejectLog($request)
{
    // first, connect to the data base
    $capturedLogs = new db\CapturedLogsDAO();
    $assignments = new db\SupervisorsEmployeesDAO();

    // check if the user that captured the log is assigned to the supervisor
    $employeeID = $capturedLogs->selectUserIDByID($request['captured_log_id']);
    $hasEmployeeAssigned = $assignments->hasSupervisorAndEmployeeID(
        $_SESSION['user_id'], 
        $employeeID
    );
    
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
        $capturedLogs->getStatusByID($request['captured_log_id']) == 'Approved';
    if ($isApproved) {
        // if it is, prevent the status change and notify the user
        throw new \Exception(
            'The log is already approved and it cannot be changed.'
        );
    }

    // if the supervisor is authorized to approve this log, update the log 
    // status
    $capturedLogs->updateStatusToRejectedByID($request['captured_log_id']);
}


// Returns the number of logs that the user has with pending authorization
function countPendingLogs($request)
{
    // first, connect to the data base
    $capturedLogs = new db\CapturedLogsDAO();
    $assignments = new db\SupervisorsEmployeesDAO();

    // temporal storage for the number of pending logs
    $numPendingLogs = 0;

    // check if the user is a supervisor
    if ($_SESSION['role_name'] === 'Supervisor') {
        // then, get the list of employees that the supervisor has assigned
        $employees = 
            $assignments->selectEmployeesBySupervisorID($_SESSION['user_id']);

        // for each employee assigned to the supervisor...
        foreach ($employees as $employee) {
            $numPendingLogs += $capturedLogs->countUnapprovedLogsByUserID(
                $employee['id']
            );
        }
    } else {
        // if the user is not a supervisor, it means she's an employee
        $numPendingLogs += $capturedLogs->countUnapprovedLogsByUserID(
            $_SESSION['user_id']
        );
    }

    // return the resulting number
    return $numPendingLogs;
}

?>
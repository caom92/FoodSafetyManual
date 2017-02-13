<?php

namespace fsm\services\account;

require_once realpath(dirname(__FILE__).'/../dao/UsersDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/ZonesDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/PrivilegesDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/RolesDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/UsersLogsPrivilegesDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/SupervisorsEmployeesDAO.php');
require_once realpath(dirname(__FILE__).'/../data_validations.php');

use fsm\database as db;
use fsm\validations as val;


$accountServices = [
    'list-users' => [
        'requirements_desc' => [
            'logged_in' => [ 'Administrator' ]
        ],
        'callback' => 'fsm\services\account\getAllUsersAccountInfo'
    ],
    'get-employee-info' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'employee_num' => [
                'type' => 'int'
            ]
        ],
        'callback' => 'fsm\services\account\getUserAccountInfo'
    ],
    'is-login-name-duplicated' => [
        'requirements_desc' => [
            'logged_in' => 'any',
            'login_name' => [
                'type' => 'string',
                'min_length' => 5
            ]
        ],
        'callback' => 'fsm\services\account\isLogInNameDuplicated'
    ],
    'is-employee-num-duplicated' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'employee_num' => [
                'type' => 'int'
            ]
        ],
        'callback' => 'fsm\services\account\isEmployeeNumDuplicated'
    ],
    'change-username' => [
        'requirements_desc' => [
            'logged_in' => 'any',
            'password' => [
                'type' => 'string',
                'min_length' => 6
            ],
            'new_username' => [
                'type' => 'string',
                'min_length' => 5
            ]
        ],
        'callback' => 'fsm\services\account\editLogInName'
    ],
    'change-password' => [
        'requirements_desc' => [
            'logged_in' => 'any',
            'password' => [
                'type' => 'string',
                'min_length' => 6
            ],
            'new_password' => [
                'type' => 'string',
                'min_length' => 6
            ]
        ],
        'callback' => 'fsm\services\account\editPassword'
    ],
    'toggle-account-activation' => [
        'requirements_desc' => [
            'logged_in' => [ 'Administrator'],
            'user_id' => [
                'type' => 'int',
                'min' => 1
            ]
        ],
        'callback' => 'fsm\services\account\toggleAccountActivation'
    ],
    'list-privileges' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator']
        ],
        'callback' => 'fsm\services\account\getAllUserPrivileges'
    ],
    'list-user-roles' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator']
        ],
        'callback' => 'fsm\services\account\getAllUserRoles'
    ],
    'add-user' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'employee_num' => [
                'type' => 'int'
            ],
            'first_name' => [
                'type' => 'string',
                'min_length' => 2
            ],
            'last_name' => [
                'type' => 'string',
                'min_length' => 2
            ],
            'role_id' => [
                'type' => 'int',
                'min' => 1
            ],
            'login_name' => [
                'type' => 'string',
                'min_length' => 3
            ],  
            'login_password' => [
                'type' => 'string',
                'min_length' => 6
            ]
        ],
        'callback' => 'fsm\services\account\addNewUserAccount'
    ],
    'edit-user-privileges' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'user_id' => [
                'type' => 'int',
                'min' => 1
            ],
            'privileges' => [
                'type' => 'array'
            ]
        ],
        'callback' => 'fsm\services\account\editPrivileges'
    ],
    'get-privileges-of-employee' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'employee_num' => [
                'type' => 'int'
            ]
        ],
        'callback' => 'fsm\services\account\getPrivilegesOfUser'
    ],
    'director-change-zones' => [
        'requirements_desc' => [
            'logged_in' => ['Director'],
            'zone_id' => [
                'type' => 'int',
                'min' => 1
            ]
        ],
        'callback' => 'fsm\services\account\changeZoneOfDirector'
    ],
    'edit-user-role' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'user_id' => [
                'type' => 'int',
                'min' => 1
            ],
            'role_id' => [
                'type' => 'int',
                'min' => 1
            ]
        ],
        'callback' => 'fsm\services\account\editUserRole'
    ],
    'edit-user-zone' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'user_id' => [
                'type' => 'int',
                'min' => 1
            ],
            'zone_id' => [
                'type' => 'int',
                'min' => 1
            ]
        ],
        'callback' => 'fsm\services\account\editZoneOfUser'
    ]
];

// Returns a list of all the active users
function getAllUsersAccountInfo($request) 
{
    $users = new db\UsersDAO();
    return $users->selectAll();
}


// Returns the profile info of the specified user
function getUserAccountInfo($request) 
{
    $users = new db\UsersDAO();
    $assignments = new db\SupervisorsEmployeesDAO();
    $userInfo = $users->getByIdentifier($request['employee_num']);
    $supervisorID = $assignments->getSupervisorIDByUserID($userInfo['user_id']);

    return [
        'id' => $userInfo['user_id'],
        'role_id' => $userInfo['role_id'],
        'role_name' => $userInfo['role_name'],
        'zone_id' => $userInfo['zone_id'],
        'zone_name' => $userInfo['zone_name'],
        'employee_num' => $userInfo['employee_num'],
        'first_name' => $userInfo['first_name'],
        'last_name' => $userInfo['last_name'],
        'login_name' => $userInfo['login_name'],
        'supervisor_id' => $supervisorID
    ];
}


// Checks if the log in name is duplicated
function isLogInNameDuplicated($request) 
{
    // first we connect to the database
    $users = new db\UsersDAO();

    // then we check if the name is duplicated
    return $users->hasByLogInName($request['login_name']);
}


// Checks if the employee ID number is duplicated
function isEmployeeNumDuplicated($request) 
{
    // first we connect to the database
    $users = new db\UsersDAO();

    // then we check if the name is duplicated
    return $users->hasByEmployeeNum($request['employee_num']);
}


// Changes the log in name of the user
function editLogInName($request) 
{
    // first we connect to the database
    $users = new db\UsersDAO();

    // then we check if the name is duplicated and if the password is valid
    $isNameDuplicated = $users->hasByLogInName($request['new_username']);
    $isPasswordValid = password_verify(
        $request['password'],
        $_SESSION['login_password']
    );
    
    if ($isNameDuplicated) {
        throw new \Exception(
            'Failed to update user name; new name is already taken.'
        );
    }

    if (!$isPasswordValid) {
        throw new \Exception(
            'Failed to update user name; the password is incorrect.'
        );
    }
    
    // if the password is not duplicated and the password is valid, then
    // update the user name
    $users->updateLogInNameByUserID(
        $_SESSION['user_id'],
        $request['new_username']
    );

    return [];
}


// Changes the user log in password
function editPassword($request) 
{
    // first, connect to the data base
    $users = new db\UsersDAO();

    // check if the password is valid
    $isPasswordValid = password_verify(
        $request['password'], 
        $_SESSION['login_password']
    );

    if (!$isPasswordValid) {
        throw new \Exception(
            'Password could not be changed; authentication credentials '. 
            'where incorrect.'
        );
    }

    // obtain the hash of the new password
    $newPasswd = password_hash($request['new_password'], \PASSWORD_BCRYPT);

    // check if the user is intending to update the password of another user
    $isUpdatingOtherPassword = 
        isset($request['user_id'])
        && array_key_exists('user_id', $request)
        && $_SESSION['role_name'] === 'Administrator';

    // if the user is intending to update another's password, make sure the
    // provided ID is a valid value
    if ($isUpdatingOtherPassword && !val\isInteger($request['user_id'])) {
        throw new \Exception(
            'User ID is not an integer value.'
        );
    }

    // store the new password in the data base 
    $users->updatePasswordByUserID(
        ($isUpdatingOtherPassword) ? $request['user_id'] : $_SESSION['user_id'], 
        $newPasswd
    );

    // save the new password in the session storage
    if ($isUpdatingOtherPassword) {
        $_SESSION['login_password'] = $newPasswd;
    }
}


// Toggles the activation of the specified account
function toggleAccountActivation($request) 
{
    $users = new db\UsersDAO();
    $assignments = new db\SupervisorsEmployeesDAO();

    // check if the user is already a supervisor so that we check the number of
    // employees she has assigned
    $currentRole = $users->getRoleByID($request['user_id']);
    $isCurrentlySupervisor = $currentRole === 'Supervisor';

    if ($isCurrentlySupervisor) {
        // if the current role is supervisor, retrieve the number of employees 
        // that she has assigned
        $numEmployees = 
            $assignments->getNumEmployeesBySupervisorID($request['user_id']);

        // if she does, prevent the role change
        $hasEmployeesAssigned = $numEmployees > 0;
        if ($hasEmployeesAssigned) {
            throw new \Exception('Supervisor has employees assigned.');
        }
    }

    $users->toggleActivationByID($request['user_id']);
    return [];
}


// Returns a list of all the user privileges
function getAllUserPrivileges($request)
{
    $privileges = new db\PrivilegesDAO();
    return $privileges->selectAll();
}


// Returns a list of all the user roles
function getAllUserRoles($request)
{
    $roles = new db\RolesDAO();
    return $roles->selectAll();
}


// Creates a new user account
function addNewUserAccount($request)
{
    // first, connect to the data base
    $users = new db\UsersDAO();
    $roles = new db\RolesDAO();
    $userPrivileges = new db\UsersLogsPrivilegesDAO();
    $assignments = new db\SupervisorsEmployeesDAO();

    // then, hash the password
    $hashedPassword = password_hash(
        $request['login_password'],
        \PASSWORD_BCRYPT
    );

    // get the role name
    $roleName = $roles->getNameByID($request['role_id']);

    // user data to store in the data base
    $userData = [
        'is_active' => TRUE,
        'role_id' => $request['role_id'],
        'employee_num' => $request['employee_num'],
        'first_name' => $request['first_name'],
        'last_name' => $request['last_name'],
        'login_name' => $request['login_name'],
        'login_password' => $hashedPassword
    ];

    // check the user role
    $isManager = $roleName == 'Manager';
    $isSupervisor = $roleName == 'Supervisor';
    $isEmployee = $roleName == 'Employee';

    // check if the user role requires a zone to be specified
    $isZoneRequired = 
        $isManager ||
        $isSupervisor ||
        $isEmployee;

    // check if the user role requires a supervisor to be specified
    $isSupervisorRequired = $isEmployee;

    // check if the user role requires privileges to be specified
    $arePrivilegesRequired = $isSupervisor || $isEmployee;

    // if a zone is required ...
    if ($isZoneRequired) {
        // check if the zone ID was sent by the user
        $isZoneIDValid = 
            isset($request['zone_id'])
            && array_key_exists('zone_id', $request);
        
        // if it was ...
        if ($isZoneIDValid) {
            // check if the zone ID is a valid integer
            if (val\isInteger($request['zone_id'])) {
                // if it was, store it in the user data
                $userData['zone_id'] = $request['zone_id'];
            } else {
                // if not, notiy the user
                throw new \Exception('The Zone ID is not a valid integer.');
            }
        } else {
            // if the zone ID was not provided, notify the user
            throw new \Exception(
                'The zone ID was not provided.'
            );
        }
    } else {
        // if the role does not require a zone ID, set a default one
        $userData['zone_id'] = 1;
    }

    // insert the profile data to the data base 
    $userID = $users->insert($userData);

    // if a supervisor is required ...
    if ($isSupervisorRequired) {
        // check that the supervisor ID was provided
        $isSupervisorIDValid = 
            isset($request['supervisor_id'])
            && array_key_exists('supervisor_id', $request);

        // if it was provided...
        if ($isSupervisorIDValid) {
            // check that it is a valid integer
            if (val\isInteger($request['supervisor_id'])) {
                // if the supervisor ID is valid, assert that the ID provided 
                // corresponds to a supervisor and that both the 
                // supervisor and the employee share the same zone

                // get the supervisor's zone and role
                $supervisorZone = 
                    $users->getZoneIDByID($request['supervisor_id']);

                $supervisorRole =
                    $users->getRoleByID($request['supervisor_id']);

                // check if the supervisor has the same zone as the employee
                $haveSameZone = 
                    $supervisorZone == $userData['zone_id'];

                // check if the supervisor has a supervisor role
                $hasSupervisorRole = 
                    $supervisorRole == 'Supervisor';

                // if the zone is not the same, notify the user
                if (!$haveSameZone) {
                    $users->deleteByID($userID);
                    throw new \Exception(
                        'The employee is in a different zone than the '.
                        'supervisor'
                    );
                }

                // if the supervisor does not have the proper role, notify the 
                // user
                if (!$hasSupervisorRole) {
                    $users->deleteByID($userID);
                    throw new \Exception(
                        'The provided supervisor ID does not correspond to a '.
                        'user with supervisor role'
                    );
                }

                // if the supervisor ID is valid and can be assigned, do the 
                // actual assignment
                $assignments->insert([
                    'supervisor_id' => $request['supervisor_id'],
                    'employee_id' => $userID
                ]);
            } else {
                // if it's not, notify the user
                $users->deleteByID($userID);
                throw new \Exception(
                    'Supervisor ID is not a valid integer.'
                );
            }
        } else {
            // if the supervisor ID was not provided, notify the user
            $users->deleteByID($userID);
            throw new \Exception(
                'Employees must be assigned to a supervisor; no supervisor ID '.
                'was provided.'
            );
        }
    }

    if ($arePrivilegesRequired) {
        // check that the data in the privileges array exists and is 
        // of the proper type
        if (isset($request['privileges'])) {
            foreach ($request['privileges'] as $privilege) {
                $isInteger = val\isInteger($privilege['log_id']);
                if (!$isInteger) {
                    $users->deleteByID($userID);
                    throw new \Exception(
                        'A log ID provided is not an integer'
                    );
                }

                $isInteger = val\isInteger($privilege['privilege_id']);
                if (!$isInteger) {
                    $users->deleteByID($userID);
                    throw new \Exception(
                        'A privilege ID provided is not an integer'
                    );
                }
            }
        } else {
            // if it was not provided, throw an exception
            $users->deleteByID($userID);
            throw new \Exception('privileges array was not provided.');
        }

        // supervisor and employees get their permissions assigned by the 
        // administrator for a single zone only

        // get the ID of the read privilege
        $privilegesTable = new db\PrivilegesDAO();
        $privilegeID = $privilegesTable->getIDByName('Read');

        // create a privileges array with the proper format that medoo is 
        // expecting
        $privileges = [];
        foreach ($request['privileges'] as $privilege) {
            array_push($privileges, [
                'user_id' => $userID,
                'log_id' => $privilege['log_id'],
                'privilege_id' => (isset($isSupervisor)) ?
                    $privilegeID :
                    $privilege['privilege_id']
            ]);
        }

        // store the user privileges in the data base 
        $userPrivileges->insert($privileges);
    }

    return [];
}


// Changes the log privileges of an specified user
function editPrivileges($request)
{
    // before we start, check that the data in the array is of the proper type
    foreach ($request['privileges'] as $privilege) {
        $isInteger = val\isInteger($privilege['log_id']);
        if (!$isInteger) {
            throw new \Exception('A log ID provided is not an integer');
        }

        $isInteger = val\isInteger($privilege['privilege_id']);
        if (!$isInteger) {
            throw new \Exception('A privilege ID provided is not an integer');
        }
    }

    // then, connect to the data base
    $userPrivileges = new db\UsersLogsPrivilegesDAO();

    // update the log privileges of the user
    foreach ($request['privileges'] as $privilege) {
        $id = $userPrivileges->getIDByUserAndLogID(
            $request['user_id'],
            $privilege['log_id']
        );

        if (isset($id)) {
            $userPrivileges->updatePrivilegeByID(
                $id,
                $privilege['privilege_id']
            );
        } else {
            $userPrivileges->insert([
                'user_id' => $request['user_id'],
                'log_id' => $privilege['log_id'],
                'privilege_id' => $privilege['privilege_id']
            ]);
        }
    }

    return [];
}


// [***]
// Returns a list of the privileges that a given user identified by its 
// employee number has organized by log
function getPrivilegesOfUser($request)
{
    // first, connect to the data base and get the role of the user
    $users = new db\UsersDAO();
    $role = $users->getRoleByEmployeeNum($request['employee_num']);

    // check if the role of this user requires privileges to be read from the db
    $requiresPrivileges = $role === 'Supervisor' || $role === 'Employee';
    if ($requiresPrivileges) {
        // if the user requires its privileges to be read from the db
        // connect to the db to get them
        $userPrivileges = new db\UsersLogsPrivilegesDAO();
        $rows = $userPrivileges->selectByEmployeeNum($request['employee_num']);

        // also get the ID of the privilege that corresponds to the Read
        // privilege from the db
        $privilegesTable = new db\PrivilegesDAO();
        $privilegeID = $privilegesTable->getIDByName('Read');

        // finally check if the user is a supervisor
        $isSupervisor = $role === 'Supervisor';

        // now prepare the temporal storage for the array that will contain
        // the privileges of the user
        $privileges = [];
        $program = [
            'id' => 0,
            'name' => '',
            'modules' => []
        ];
        $module = [
            'id' => 0,
            'name' => '',
            'logs' => []
        ];

        // for each row read from the db
        foreach ($rows as $row) {
            // check if the program has changed
            $hasProgramChanged = $row['program_id'] != $program['id'];
            if ($hasProgramChanged) {
                // if it has, check that the current program is not empty
                if ($program['id'] != 0) {
                    // if its not, save the current modules to it
                    array_push($program['modules'], $module);

                    // and save the current program to the final array
                    array_push($privileges, $program);
                }

                // then read the log privilege of the new program
                $log = [
                    'id' => $row['log_id'],
                    'name' => $row['log_name'],
                    'privilege_id' => ($isSupervisor) ?
                        $privilegeID :
                        $row['privilege_id']
                ];

                // and fill the temporal storage of the new module and program
                $module = [
                    'id' => $row['module_id'],
                    'name' => $row['module_name'],
                    'logs' => [ $log ]
                ];
                $program = [
                    'id' => $row['program_id'],
                    'name' => $row['program_name'],
                    'modules' => []
                ];
            } else {
                // if the module has changed
                $hasModuleChanged = $row['module_id'] != $module['id'];
                if ($hasModuleChanged) {
                    // store the current module to the current program
                    array_push($program['modules'], $module);

                    // and start saving the info of the log and the new module
                    $log = [
                        'id' => $row['log_id'],
                        'name' => $row['log_name'],
                        'privilege_id' => ($isSupervisor) ?
                            $privilegeID :
                            $row['privilege_id']
                    ];
                    $module = [
                        'id' => $row['module_id'],
                        'name' => $row['module_name'],
                        'logs' => [ $log ]
                    ];
                } else {
                    // if the program, nor the module have changed, simply store
                    // the log info in the current module storage
                    array_push($module['logs'], [
                        'id' => $row['log_id'],
                        'name' => $row['log_name'],
                        'privilege_id' => ($isSupervisor) ?
                            $privilegeID :
                            $row['privilege_id']
                    ]);
                }
            }
        }

        // don't forget to store the last module and program
        if ($module['id'] != 0) {
            array_push($program['modules'], $module);
        }

        if ($program['id'] != 0) {
            array_push($privileges, $program);
        }

        // and return the resulting array
        return $privileges;
    } else {
        // if the user role does not requires her to have privileges, don't
        // even bother with computer the array
        return [];
    }
}


// Changes the zone upon which the user is acting to the one with the 
// especified ID
function changeZoneOfDirector($request)
{
    // get the info of the zone using the ID
    $zones = new db\ZonesDAO();
    $zone = $zones->getByID($request['zone_id']);
    
    // check if the zone exists
    if (!isset($zone)) {
        // if not, notify the user
        throw new \Exception(
            "No zone with ID ".$request['zone_id']." could be find"
        );
    }

    // update the zone info associated with the account's session
    $_SESSION['zone_id'] = $zone['id'];
    $_SESSION['zone_name'] = $zone['name'];

    // return the info of the new zone
    return $zone;
}


// Changes the role of a user to another
function editUserRole($request)
{
    // first, connect to the database
    $users = new db\UsersDAO();
    $assignments = new db\SupervisorsEmployeesDAO();
    $roles = new db\RolesDAO();

    // check if the user is already a supervisor so that we check the number of
    // employees she has assigned
    $currentRole = $users->getRoleByID($request['user_id']);
    $isCurrentlySupervisor = $currentRole === 'Supervisor';

    if ($isCurrentlySupervisor) {
        // if the current role is supervisor, retrieve the number of employees 
        // that she has assigned
        $numEmployees = 
            $assignments->getNumEmployeesBySupervisorID();

        // if she does, prevent the role change
        $hasEmployeesAssigned = $numEmployees > 0;
        if ($hasEmployeesAssigned) {
            throw new \Exception('Supervisor has employees assigned.');
        }
    }

    // check if the user will be assigned an employee role, and if that is the 
    // case, then that means that a supervisor ID must be provided so that the
    // user gets assigned to that supervisor
    $roleName = $roles->getNameByID($request['role_id']);
    $isSupervisorRequired = $roleName === 'Employee';
    
    // if a supervisor is required ...
    if ($isSupervisorRequired) {
        // first, check if the user already has a supervisor assigned
        $hasSupervisor = $assignments->hasEmployeeID($request['user_id']);

        // if the user does not have a supervisor assigned, we need to assign
        // her the one that was provided
        if (!$hasSupervisor) {
            // check that the supervisor ID was provided
            $isSupervisorIDValid = 
                isset($request['supervisor_id'])
                && array_key_exists('supervisor_id', $request);

            // if it was provided...
            if ($isSupervisorIDValid) {
                // check that it is a valid integer
                if (val\isInteger($request['supervisor_id'])) {
                    // if the supervisor ID is valid, assert that the ID 
                    // provided corresponds to a supervisor and that both the 
                    // supervisor and the employee share the same zone

                    // get the supervisor's zone and role
                    $supervisorZone = 
                        $users->getZoneIDByID($request['supervisor_id']);

                    $supervisorRole =
                        $users->getRoleByID($request['supervisor_id']);

                    // check if the supervisor has the same zone as the employee
                    $haveSameZone = 
                        $supervisorZone === $userData['zone_id'];

                    // check if the supervisor has a supervisor role
                    $hasSupervisorRole = 
                        $supervisorRole === 'Supervisor';

                    // if the zone is not the same, notify the user
                    if (!$haveSameZone) {
                        throw new \Exception(
                            'The employee is in a different zone than the '.
                            'supervisor'
                        );
                    }

                    // if the supervisor does not have the proper role, notify 
                    // the user
                    if (!$hasSupervisorRole) {
                        throw new \Exception(
                            'The provided supervisor ID does not correspond to'.
                            ' a user with supervisor role'
                        );
                    }

                    // if the supervisor ID is valid and can be assigned, do 
                    // the actual assignment
                    $assignments->insert([
                        'supervisor_id' => $request['supervisor_id'],
                        'employee_id' => $userID
                    ]);
                } else {
                    // if it's not, notify the user
                    $users->deleteByID($userID);
                    throw new \Exception(
                        'Supervisor ID is not a valid integer.'
                    );
                }
            } else {
                // if the supervisor ID was not provided, notify the user
                throw new \Exception(
                    'Employees must be assigned to a supervisor; no supervisor'.
                    ' ID was provided.'
                );
            }
        }
    }

    // finally, change the user role
    $users->updateRoleByID($request['user_id'], $request['role_id']);
}


// Edits the zone of the especified user to the one provided
function editZoneOfUser($request)
{
    // first, connect to the data base
    $users = new db\UsersDAO();
    $assignments = new db\SupervisorsEmployeesDAO();

    // check if the user is already a supervisor so that we check the number of
    // employees she has assigned
    $currentRole = $users->getRoleByID($request['user_id']);
    $isCurrentlySupervisor = $currentRole === 'Supervisor';

    if ($isCurrentlySupervisor) {
        // if the current role is supervisor, retrieve the number of employees 
        // that she has assigned
        $numEmployees = 
            $assignments->getNumEmployeesBySupervisorID($request['user_id']);

        // if she does, prevent the role change
        $hasEmployeesAssigned = $numEmployees > 0;
        if ($hasEmployeesAssigned) {
            throw new \Exception('Supervisor has employees assigned.');
        }
    }

    $users->updateZoneIDByID($request['user_id'], $request['zone_id']);
}

?>
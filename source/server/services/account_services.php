<?php

namespace fsm\services\account;


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
            ],
            'user_id' => [
                'type' => 'int',
                'min' => 1,
                'optional' => true
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
            ],
            'zone_id' => [
                'type' => 'int',
                'min' => 1,
                'optional' => true
            ],
            'supervisor_id' => [
                'type' => 'int',
                'min' => 1,
                'optional' => true
            ],
            'privileges' => [
                'type' => 'array',
                'optional' => true,
                'values' => [
                    'log_id' => [
                        'type' => 'int',
                        'min' => 1
                    ],
                    'privilege_id' => [
                        'type' => 'int',
                        'min' => 1
                    ]
                ]
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
                'type' => 'array',
                'values' => [
                    'log_id' => [
                        'type' => 'int',
                        'min' => 1
                    ],
                    'privilege_id' => [
                        'type' => 'int',
                        'min' => 1
                    ]
                ]
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
            ],
            'supervisor_id' => [
                'type' => 'int',
                'min' => 1,
                'optional' => true
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


// Resets the session ID for the current session
function resetSessionID($session, $segment)
{
    $userID = $segment->get('user_id');
    $segment->set('user_id', NULL);
    $session->regenerateId();
    $segment->set('user_id', $userID);
}


// Returns a list of all the active users
function getAllUsersAccountInfo($scope, $request) 
{
    return $scope->users->selectAll();
}


// Returns the profile info of the specified user
function getUserAccountInfo($scope, $request) 
{
    $userInfo = $scope->users->getByIdentifier($request['employee_num']);
    $supervisorID = $scope->supervisorsEmployees->getSupervisorIDByUserID(
        $userInfo['user_id']);

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
function isLogInNameDuplicated($scope, $request) 
{
    // then we check if the name is duplicated
    return $scope->users->hasByLogInName($request['login_name']);
}


// Checks if the employee ID number is duplicated
function isEmployeeNumDuplicated($scope, $request) 
{
    // then we check if the name is duplicated
    return $scope->users->hasByEmployeeNum($request['employee_num']);
}


// Changes the log in name of the user
function editLogInName($scope, $request) 
{
    // get the session segment
    $segment = $scope->session->getSegment('fsm');

    // then we check if the name is duplicated and if the password is valid
    $isNameDuplicated = $scope->users->hasByLogInName($request['new_username']);
    $isPasswordValid = password_verify(
        $request['password'],
        $segment->get('login_password')
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
        $segment->get('user_id'),
        $request['new_username']
    );
}


// Changes the user log in password
function editPassword($scope, $request) 
{
    // get the session segment
    $segment = $scope->session->getSegment('fsm');

    // check if the password is valid
    $isPasswordValid = password_verify(
        $request['password'], 
        $segment->get('login_password')
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
        && $segment->get('role_name') === 'Administrator';

    // store the new password in the data base 
    $scope->users->updatePasswordByUserID(
        ($isUpdatingOtherPassword) ? 
            $request['user_id'] : $segment->get('user_id'),
        $newPasswd
    );

    // save the new password in the session storage
    if (!$isUpdatingOtherPassword) {
        resetSessionID($scope->session, $segment);
        $segment->set('login_password', $newPasswd);
    }
}


// Toggles the activation of the specified account
function toggleAccountActivation($scope, $request) 
{
    // check if the user is already a supervisor so that we check the number of
    // employees she has assigned
    $currentRole = $scope->users->getRoleByID($request['user_id']);
    $isCurrentlySupervisor = $currentRole === 'Supervisor';

    if ($isCurrentlySupervisor) {
        // if the current role is supervisor, retrieve the number of employees 
        // that she has assigned
        $numEmployees = 
            $scope->supervisorsEmployees->getNumEmployeesBySupervisorID(
                $request['user_id']);

        // if she does, prevent the role change
        $hasEmployeesAssigned = $numEmployees > 0;
        if ($hasEmployeesAssigned) {
            throw new \Exception('Supervisor has employees assigned.');
        }
    }

    $scope->users->toggleActivationByID($request['user_id']);
}


// Returns a list of all the user privileges
function getAllUserPrivileges($scope, $request)
{
    return $scope->privileges->selectAll();
}


// Returns a list of all the user roles
function getAllUserRoles($scope, $request)
{
    return $scope->roles->selectAll();
}


// Creates a new user account
function addNewUserAccount($scope, $request)
{
    // then, hash the password
    $hashedPassword = password_hash(
        $request['login_password'],
        \PASSWORD_BCRYPT
    );

    // get the role name
    $roleName = $scope->roles->getNameByID($request['role_id']);

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
            // store it in the user data
            $userData['zone_id'] = $request['zone_id'];
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
    $userID = $scope->users->insert($userData);

    // if a supervisor is required ...
    if ($isSupervisorRequired) {
        // check that the supervisor ID was provided
        $isSupervisorIDValid = 
            isset($request['supervisor_id'])
            && array_key_exists('supervisor_id', $request);

        // if it was provided...
        if ($isSupervisorIDValid) {
            // if the supervisor ID is valid, assert that the ID provided 
            // corresponds to a supervisor and that both the 
            // supervisor and the employee share the same zone

            // get the supervisor's zone and role
            $supervisorZone = 
                $scope->users->getZoneIDByID($request['supervisor_id']);

            $supervisorRole =
                $scope->users->getRoleByID($request['supervisor_id']);

            // check if the supervisor has the same zone as the employee
            $haveSameZone = 
                $supervisorZone == $userData['zone_id'];

            // check if the supervisor has a supervisor role
            $hasSupervisorRole = 
                $supervisorRole == 'Supervisor';

            // if the zone is not the same, notify the user
            if (!$haveSameZone) {
                $scope->users->deleteByID($userID);
                throw new \Exception(
                    'The employee is in a different zone than the '.
                    'supervisor'
                );
            }

            // if the supervisor does not have the proper role, notify the 
            // user
            if (!$hasSupervisorRole) {
                $scope->users->deleteByID($userID);
                throw new \Exception(
                    'The provided supervisor ID does not correspond to a '.
                    'user with supervisor role'
                );
            }

            // if the supervisor ID is valid and can be assigned, do the 
            // actual assignment
            $scope->supervisorsEmployees->insert([
                'supervisor_id' => $request['supervisor_id'],
                'employee_id' => $userID
            ]);
        } else {
            // if the supervisor ID was not provided, notify the user
            $scope->users->deleteByID($userID);
            throw new \Exception(
                'Employees must be assigned to a supervisor; no supervisor ID '.
                'was provided.'
            );
        }
    }

    if ($arePrivilegesRequired) {
        // check that the data in the privileges array exists and is 
        // of the proper type
        $hasPrivileges = isset($request['privileges']) 
            && array_key_exists('privileges', $request);
        if (!$hasPrivileges) {
            // if it was not provided, throw an exception
            $scope->users->deleteByID($userID);
            throw new \Exception('privileges array was not provided.');
        }

        // supervisor and employees get their permissions assigned by the 
        // administrator for a single zone only

        // get the ID of the read privilege
        $privilegeID = $scope->privileges->getIDByName('Read');

        // create a privileges array with the proper format that medoo is 
        // expecting
        $privileges = [];
        foreach ($request['privileges'] as $privilege) {
            array_push($privileges, [
                'user_id' => $userID,
                'log_id' => $privilege['log_id'],
                'privilege_id' => ($isSupervisor) ?
                    $privilegeID :
                    $privilege['privilege_id']
            ]);
        }

        // store the user privileges in the data base 
        $scope->usersLogsPrivileges->insert($privileges);
    }
}


// Changes the log privileges of an specified user
function editPrivileges($scope, $request)
{
    // update the log privileges of the user
    foreach ($request['privileges'] as $privilege) {
        $id = $scope->usersLogsPrivileges->getIDByUserAndLogID(
            $request['user_id'],
            $privilege['log_id']
        );

        if (isset($id)) {
            $scope->usersLogsPrivileges->updatePrivilegeByID(
                $id,
                $privilege['privilege_id']
            );
        } else {
            $scope->usersLogsPrivileges->insert([
                'user_id' => $request['user_id'],
                'log_id' => $privilege['log_id'],
                'privilege_id' => $privilege['privilege_id']
            ]);
        }
    }
}


// [***]
// Returns a list of the privileges that a given user identified by its 
// employee number has organized by log
function getPrivilegesOfUser($scope, $request)
{
    $role = $scope->users->getRoleByEmployeeNum($request['employee_num']);

    // check if the role of this user requires privileges to be read from the db
    $requiresPrivileges = $role === 'Supervisor' || $role === 'Employee';
    if ($requiresPrivileges) {
        // if the user requires its privileges to be read from the db
        // connect to the db to get them
        $rows = $scope->usersLogsPrivileges->selectByEmployeeNum(
            $request['employee_num']);

        // before we start, we must check if the user has privileges assigned to
        // ALL logs in the database
        $allLogs = $scope->logs->selectAll();
        $isUserMissingLogs = count($rows) < count($allLogs);

        // if the user is missing logs in its privileges array...
        if ($isUserMissingLogs) {
            // get the ID of the user and for the None privilege
            $userID = $scope->users->getIDByEmployeeNum(
                $request['employee_num']);
            $privilegeID = $scope->privileges->getIDByName('None');

            // create temporal storage for all the new privileges that will be 
            // stored in the data base
            $newPrivileges = [];

            // then, visit all the logs from the data base
            foreach ($allLogs as $log) {
                // initialize a flag that will tell if the user is missing a 
                // privilege for this log
                $isLogMissing = true;

                // then, visit the logs for which the user has a privilege 
                // assigned
                foreach ($rows as $privilegedLog) {
                    // if the log has a privilege assigned, update the flag and 
                    // break the loop
                    if ($privilegedLog['log_id'] == $log['log_id']) {
                        $isLogMissing = false;
                        break;
                    }
                }

                // if the user does not have a privilege assigned for the log,
                // push it to the array of new privileges to be assigned to the 
                // user
                if ($isLogMissing) {
                    array_push($newPrivileges, [
                        'user_id' => $userID,
                        'log_id' => $log['log_id'],
                        'privilege_id' => $privilegeID
                    ]);
                }
            }

            // insert the new privileges to the data base
            $scope->usersLogsPrivileges->insert($newPrivileges);

            // get the updated list of privileges
            $rows = $scope->usersLogsPrivileges->selectByEmployeeNum(
                $request['employee_num']);
        }

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
                    'privilege_id' => $row['privilege_id']
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
                        'privilege_id' => $row['privilege_id']
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
                        'privilege_id' => $row['privilege_id']
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
function changeZoneOfDirector($scope, $request)
{
    // get the session segment
    $segment = $scope->session->getSegment('fsm');

    // get the info of the zone using the ID
    $zone = $scope->zones->getByID($request['zone_id']);
    
    // check if the zone exists
    if (!isset($zone)) {
        // if not, notify the user
        throw new \Exception(
            "No zone with ID ".$request['zone_id']." could be find"
        );
    }

    // update the zone info associated with the account's session
    resetSessionID($scope->session, $segment);
    $segment->set('zone_id', $zone['id']);
    $segment->set('zone_name', $zone['name']);

    // return the info of the new zone
    return $zone;
}


// Changes the role of a user to another
function editUserRole($scope, $request)
{
    // check if the user is already a supervisor so that we check the number of
    // employees she has assigned
    $currentRole = $scope->users->getRoleByID($request['user_id']);
    $isCurrentlySupervisor = $currentRole === 'Supervisor';
    $isCurrentlyEmployee = $currentRole === 'Employee';

    if ($isCurrentlySupervisor) {
        // if the current role is supervisor, retrieve the number of employees 
        // that she has assigned
        $numEmployees = 
            $scope->supervisorsEmployees->getNumEmployeesBySupervisorID(
                $request['user_id']
            );

        // if she does, prevent the role change
        $hasEmployeesAssigned = $numEmployees > 0;
        if ($hasEmployeesAssigned) {
            throw new \Exception('Supervisor has employees assigned.');
        }
    }

    // check if the user will be assigned an employee role, and if that is the 
    // case, then that means that a supervisor ID must be provided so that the
    // user gets assigned to that supervisor
    $roleName = $scope->roles->getNameByID($request['role_id']);
    $isSupervisorRequired = $roleName === 'Employee';
    
    // if a supervisor is required ...
    if ($isSupervisorRequired) {
        if ($isCurrentlyEmployee) {
            
        }

        // first, check if the user already has a supervisor assigned
        $hasSupervisor = $scope->supervisorsEmployees->hasEmployeeID(
            $request['user_id']);

        // if the user does not have a supervisor assigned, we need to assign
        // her the one that was provided
        if (!$hasSupervisor) {
            // check that the supervisor ID was provided
            $isSupervisorIDValid = 
                isset($request['supervisor_id'])
                && array_key_exists('supervisor_id', $request);

            // if it was provided...
            if ($isSupervisorIDValid) {
                // if the supervisor ID is valid, assert that the ID 
                // provided corresponds to a supervisor and that both the 
                // supervisor and the employee share the same zone

                // get the supervisor's zone and role
                $supervisorZone = 
                    $scope->users->getZoneIDByID($request['supervisor_id']);

                $supervisorRole =
                    $scope->users->getRoleByID($request['supervisor_id']);

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
                $scope->supervisorsEmployees->insert([
                    'supervisor_id' => $request['supervisor_id'],
                    'employee_id' => $userID
                ]);
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
    $scope->users->updateRoleByID($request['user_id'], $request['role_id']);
}


// Edits the zone of the especified user to the one provided
function editZoneOfUser($scope, $request)
{
    // check if the user is already a supervisor so that we check the number of
    // employees she has assigned
    $currentRole = $scope->users->getRoleByID($request['user_id']);
    $isCurrentlySupervisor = $currentRole === 'Supervisor';

    if ($isCurrentlySupervisor) {
        // if the current role is supervisor, retrieve the number of employees 
        // that she has assigned
        $numEmployees = 
            $scope->supervisorsEmployees->getNumEmployeesBySupervisorID(
                $request['user_id']);

        // if she does, prevent the role change
        $hasEmployeesAssigned = $numEmployees > 0;
        if ($hasEmployeesAssigned) {
            throw new \Exception('Supervisor has employees assigned.');
        }
    }

    $scope->users->updateZoneIDByID($request['user_id'], $request['zone_id']);
}

?>
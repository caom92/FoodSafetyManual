<?php

namespace fsm\services\session;

use fsm;


$sessionServices = [
    'login' => [
        'requirements_desc' => [
            'username' => [
                'type' => 'string',
                'min_length' => 3
            ],
            'password' => [
                'type' => 'string',
                'min_length' => 6
            ]
        ],
        'callback' => 'fsm\services\session\logIn'
    ],
    'logout' => [
        'requirements_desc' => [],
        'callback' => 'fsm\services\session\logOut'
    ],
    'check-session' => [
        'requirements_desc' => [],
        'callback' => 'fsm\services\session\isLoggedIn'
    ]
];


// [***]
// Returns an associative array that describes the privileges that the user
// has for accessing the different programs and modules that exists in the 
// data base
// [in]     userPrivileges: an associative array that contains the rows 
//          returned from the data base after querying it for the user's 
//          privileges; in this array, the key represents the column name
// [out]    return: an associative array that organizes the user's 
//          privileges in a program/module/privilege fashion
function getPrivilegesArray($userPrivileges)
{
    // initialize the final array where the priviliges are going to be
    // stored
    $programPrivileges = [
        'zones' => []
    ];

    // initialize the temporal zone holder
    $zone = [
        'id' => 0,
        'name' => '',
        'programs' => []
    ];
    
    // initialize the temporal program holder
    $program = [
        'id' => 0,
        'name' => '',
        'modules' => []
    ];

    // initialize the temporal module holder
    $module = [
        'id' => 0,
        'name' => '',
        'logs' => []
    ];

    // visit each row from the data base query result
    foreach ($userPrivileges as $row) {
        // check if the zone has changed
        $hasZoneChanged = $row['zone_id'] != $zone['id'];
        if ($hasZoneChanged) {
            // if it has, check if the zone is not empty
            if ($zone['id'] != 0) {
                // if it is not, save the current module to the final array
                $program[$module['name']] = $module;
                $zone[$program['name']] = $program;
                $programPrivileges[$zone['name']] = $zone;
                array_push($program['modules'], $module);
                array_push($zone['programs'], $program);
                array_push($programPrivileges['zones'], $zone);
            }

            // then fill the temporal holders with the information of 
            // this new program
            $log = [
                'id' => $row['log_id'],
                'name' => $row['log_name'],
                'suffix' => $row['log_suffix'],
                'privilege' => [
                    'id' => $row['privilege_id'],
                    'name' => $row['privilege_name']
                ]
            ];
            $module = [
                'id' => $row['module_id'],
                'name' => $row['module_name'], 
                'logs' => [$log],
                $log['name'] => $log
            ];
            $program = [
                'id' => $row['program_id'],
                'name' => $row['program_name'],
                'modules' => []
            ];
            $zone = [
                'id' => $row['zone_id'],
                'name' => $row['zone_name'],
                'programs' => []
            ];
        } else {
            // if the zone has not changed, check if the program has
            $hasProgramChanged = $row['program_id'] != $program['id'];
            if ($hasProgramChanged) {
                // if it has, store the current module and program to the 
                // zone holder
                $program[$module['name']] = $module;
                $zone[$program['name']] = $program;
                array_push($program['modules'], $module);
                array_push($zone['programs'], $zone);
                
                // fill the temporal holders with the new data
                $log = [
                    'id' => $row['log_id'],
                    'name' => $row['log_name'],
                    'suffix' => $row['log_suffix'],
                    'privilege' => [
                        'id' => $row['privilege_id'],
                        'name' => $row['privilege_name']
                    ]
                ];
                $module = [
                    'id' => $row['module_id'],
                    'name' => $row['module_name'],
                    'logs' => [$log],
                    $log['name'] => $log
                ];
                $program = [
                    'id' => $row['program_id'],
                    'name' => $row['program_name'],
                    'modules' => []
                ]; 
            } else {
                // if the row has the same program than the last,
                // then check if the module has changed
                $hasModuleChanged = $row['module_id'] != $module['id'];
                if ($hasModuleChanged) {
                    // if it has, store the info in the temporal program
                    // holder
                    $program[$module['name']] = $module;
                    array_push($program['modules'], $module);

                    // and then fill the temporal module holder with the
                    // information of this new module
                    $log = [
                        'id' => $row['log_id'],
                        'name' => $row['log_name'],
                        'suffix' => $row['log_suffix'],
                        'privilege' => [
                            'id' => $row['privilege_id'],
                            'name' => $row['privilege_name']
                        ]
                    ];
                    $module = [
                        'id' => $row['module_id'],
                        'name' => $row['module_name'],
                        'logs' => [ $log ],
                        $log['name'] => $log
                    ];
                } else {
                    // if the program, zone nor the module have changed, it 
                    // means that the log has changed; store the info of 
                    // this new log in the temporal module holder
                    $log = [
                        'id' => $row['log_id'],
                        'name' => $row['log_name'],
                        'suffix' => $row['log_suffix'],
                        'privilege' => [
                            'id' => $row['privilege_id'],
                            'name' => $row['privilege_name']
                        ]
                    ];
                    $module[$log['name']] = $log;
                    array_push($module['logs'], $log);
                }
            }
        }
    } // foreach ($userPrivileges as $row)

    // don't forget to add the last entry to the final structure
    if ($module['id'] != 0) {
        $program[$module['name']] = $module;
        array_push($program['modules'], $module);
    }
    if ($program['id'] != 0) {
        $zone[$program['name']] = $program;
        array_push($zone['programs'], $program);
    }
    if ($zone['id'] != 0) {
        $programPrivileges[$zone['name']] = $zone;
        array_push($programPrivileges['zones'], $zone);
    }

    // return the resulting data structure
    return $programPrivileges;
}


// Returns an associative array that contains all the relevant profile 
// information about the user according to her role; each role would
// have different profile info
// [in]     scope: the Slim context object
// [in]     userData: general profile info that is common for all user 
//          roles in the form of an associative array
// [out]    return: an associative organizing all the relevant user info
function constructUserProfileArray($scope, $userData)
{
    // temporal storage for holding the user data to send to the client
    $userDataToSend = [
        'user_id' => $userData['user_id'],
        'role_id' => $userData['role_id'],
        'role_name' => $userData['role_name'],
        'employee_num' => $userData['employee_num'],
        'first_name' => $userData['first_name'],
        'last_name' => $userData['last_name'],
        'login_name' => $userData['login_name']
    ];

    // temporal storage for holding the user privileges
    $privileges = NULL;

    // then, compute the user's profile data structure depending on the 
    // user's role
    switch ($userData['role_name']) {
        case 'Director':
            // get all the zones and logs 
            $zones = $scope->zones->selectAll();
            $logs = $scope->logs->selectAllWithReadPrivilege();

            // the rows that hold the privileges data
            $privileges = [];

            // the director has read privileges to all logs in all zones
            foreach ($zones as $zone) {
                foreach ($logs as $log) {
                    array_push($privileges, [
                        'zone_id' => $zone['id'],
                        'zone_name' => $zone['name'],
                        'program_id' => $log['program_id'],
                        'program_name' => $log['program_name'],
                        'module_id' => $log['module_id'],
                        'module_name' => $log['module_name'],
                        'log_id' => $log['log_id'],
                        'log_name' => $log['log_name'],
                        'log_suffix' => $log['log_suffix'],
                        'privilege_id' => $log['privilege_id'],
                        'privilege_name' => $log['privilege_name']
                    ]);
                }
            }
        break;

        case 'Manager':
            // get all the logs 
            $logs = $scope->logs->selectAllWithReadPrivilege();

            // the rows that hold the privileges data
            $privileges = [];

            // the manager has read privileges to all logs in a single zone
            foreach ($logs as $log) {
                array_push($privileges, [
                    'zone_id' => $userData['zone_id'],
                    'zone_name' => $userData['zone_name'],
                    'program_id' => $log['program_id'],
                    'program_name' => $log['program_name'],
                    'module_id' => $log['module_id'],
                    'module_name' => $log['module_name'],
                    'log_id' => $log['log_id'],
                    'log_name' => $log['log_name'],
                    'log_suffix' => $log['log_suffix'],
                    'privilege_id' => $log['privilege_id'],
                    'privilege_name' => $log['privilege_name']
                ]);
            }
        break;

        case 'Supervisor':
            // get the modules associated with this user and assign them 
            // read privileges
            $logs = $scope->usersLogsPrivileges->selectByUserIDWithReadPrivilege
            (
                $userData['user_id']
            );

            // the rows that hold the privileges data
            $privileges = [];

            // the supervisor has read privileges to some logs in a single 
            // zone
            foreach ($logs as $log) {
                array_push($privileges, [
                    'zone_id' => $userData['zone_id'],
                    'zone_name' => $userData['zone_name'],
                    'program_id' => $log['program_id'],
                    'program_name' => $log['program_name'],
                    'module_id' => $log['module_id'],
                    'module_name' => $log['module_name'],
                    'log_id' => $log['log_id'],
                    'log_name' => $log['log_name'],
                    'log_suffix' => $log['log_suffix'],
                    'privilege_id' => $log['privilege_id'],
                    'privilege_name' => $log['privilege_name']
                ]);
            }
        break;

        case 'Employee':
            // get the modules associated with this user
            $logs = $scope->usersLogsPrivileges->selectByUserID(
                $userData['user_id']);
            
            // the rows that hold the privileges data
            $privileges = [];

            // the employee has read or write privileges on some logs on a 
            // single zone
            foreach ($logs as $log) {
                array_push($privileges, [
                    'zone_id' => $userData['zone_id'],
                    'zone_name' => $userData['zone_name'],
                    'program_id' => $log['program_id'],
                    'program_name' => $log['program_name'],
                    'module_id' => $log['module_id'],
                    'module_name' => $log['module_name'],
                    'log_id' => $log['log_id'],
                    'log_name' => $log['log_name'],
                    'log_suffix' => $log['log_suffix'],
                    'privilege_id' => $log['privilege_id'],
                    'privilege_name' => $log['privilege_name']
                ]);
            }
        break;

        // for the admin, we don't need the zone, nor has any privileges
        case 'Administrator':
            $userDataToSend['exclusive_access'] =
                strtolower($userData['role_name']).'/';
            return $userDataToSend;
        break;
    }

    // give the proper format to the privileges array
    $privileges = getPrivilegesArray($privileges);

    // return the final user profile data structure
    $isDirector = $userData['role_name'] === 'Director';
    $userDataToSend['zone_id'] = ($isDirector) ? 
        1 : $userData['zone_id'];
    $userDataToSend['zone_name'] = ($isDirector) ?
        'AVA' : $userData['zone_name'];
    $userDataToSend['exclusive_access'] =
        strtolower($userData['role_name']).'/';
    $userDataToSend['privileges'] = $privileges;
    return $userDataToSend;
}


// Logs the user into her account and starts a session
function logIn($scope, $request) 
{   
    // if there is a session already opened, close it before openning the 
    // new one
    if (isLoggedIn($scope, NULL)) {
        $scope->session->clear();
        $scope->session->destroy();
    }

    // attempt to connect to the data base to retrieve the user information
    $userData = $scope->users->getByIdentifier($request['username']);

    // check if the query was successful
    if (isset($userData)) {
        // check if the password is correct
        $isPasswordValid = password_verify(
            $request['password'], 
            $userData['login_password']
        );

        // if it is not, notify the user
        if (!$isPasswordValid) {
            throw new \Exception('Log in credentials are incorrect.');
        } 

        // now, retrieve the user privileges and any additional information 
        // required depending on the role of the user and create the final 
        // data structure the holds the user's profile information that 
        // will be sent to the client
        $clientProfile = constructUserProfileArray($scope, $userData);
        
        // store the user profile in the session cookie and return the info to 
        // the client
        $scope->session->regenerateId();
        $segment = $scope->session->getSegment('fsm');
        $segment->set('logged_in', TRUE);
        $_SESSION['fsm'] += $userData;

        $hasPrivileges = 
            isset($clientProfile['privileges']) 
            && array_key_exists('privileges', $clientProfile);

        if ($hasPrivileges) {
            $segment->set('privileges', $clientProfile['privileges']);
        }
        
        return $clientProfile;
    } else {
        throw new \Exception('Log in credentials are incorrect.');
    }
}


// Logs the user out from her account and ends the session
function logOut($scope, $request) 
{
    $scope->session->clear();
    $scope->session->destroy();
}


// Checks if the user is logged in
function isLoggedIn($scope, $request) 
{
    $segment = $scope->session->getSegment('fsm');
    $isLoggedIn = $segment->get('logged_in');
    return isset($isLoggedIn) ? $isLoggedIn : false;
}

?>
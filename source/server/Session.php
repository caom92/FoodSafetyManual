<?php

// The namespace of the services of the project
namespace fsm;

// Import the site configuration file
require_once realpath(dirname(__FILE__).'/config/site_config.php');

// Import the required DAOs
require_once realpath(dirname(__FILE__).'/dao/UsersDAO.php');
require_once realpath(dirname(__FILE__).'/dao/LogsDAO.php');
require_once realpath(dirname(__FILE__).
    '/dao/UsersLogsPrivilegesDAO.php');

// Alias the namespaces for ease of use
use fsm as core;
use fsm\database as db;


// Interface for managing user session in the server; provides methods for
// logging in and out and for checking if the user is logged in
class Session
{
    // Constructor starts the session library
    function __construct()
    {
        ini_set('session.name', 'USST');
        ini_set('session.hash_function', 'sha512');
        ini_set('session.referer_check', $_SERVER['HTTP_HOST'].core\SITE_ROOT);
        @session_start();
    }


    // Returns an associative array that describes the privileges that the user
    // has for accessing the different programs and modules that exists in the 
    // data base
    // [in]     userPrivileges: an associative array that contains the rows 
    //          returned from the data base after querying it for the user's 
    //          privileges; in this array, the key represents the column name
    // [out]    return: an associative array that organizes the user's 
    //          privileges in a program/module/privilege fashion
    private function getPrivilegesArray($userPrivileges)
    {
        // initialize the final array where the priviliges are going to be
        // stored
        $programPrivileges = [];
        
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
            // check if this row has a different program than the last
            $hasProgramChanged = $row['program_name'] != $program['name'];
            if ($hasProgramChanged) {
                // if it has, assert that the last row info is not empty
                if (strlen($program['name']) > 0) {
                    // if it is not, store the info in the final structure
                    array_push($program['modules'], $module);
                    array_push($programPrivileges, $program);
                }

                // then fill the temporal holders with the information of 
                // this new program
                $log = [
                    'id' => $row['log_id'],
                    'name' => $row['log_name'],
                    'privilege' => [
                        'id' => $row['privilege_id'],
                        'name' => $row['privilege_name']
                    ]
                ];
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
                // if the row has the same program than the last,
                // then check if the module has changed
                $hasModuleChanged = $row['module_name'] != $module['name'];
                if ($hasModuleChanged) {
                    // if it has, store the info in the temporal program
                    // holder
                    array_push($program['modules'], $module);

                    // and then fill the temporal module holder with the
                    // information of this new module
                    $log = [
                        'id' => $row['log_id'],
                        'name' => $row['log_name'],
                        'privilege' => [
                            'id' => $row['privilege_id'],
                            'name' => $row['privilege_name']
                        ]
                    ];
                    $module = [
                        'id' => $row['module_id'],
                        'name' => $row['module_name'],
                        'logs' => [ $log ]
                    ];
                } else {
                    // if the program nor the module have changed, it means 
                    // that the log has changed; store the info of this new
                    // log in the temporal module holder
                    array_push($module['logs'], [
                        'id' => $row['log_id'],
                        'name' => $row['log_name'],
                        'privilege' => [
                            'id' => $row['privilege_id'],
                            'name' => $row['privilege_name']
                        ]
                    ]);
                }   // if ($hasModuleChanged)
            } // if ($hasProgramChanged)
        } // foreach ($userPrivileges as $row)

        // don't forget to add the last entry to the final structure
        if (strlen($module['name']) > 0) {
            array_push($program['modules'], $module);
        }
        if (strlen($program['name']) > 0) {
            array_push($programPrivileges, $program);
        }

        // return the resulting data structure
        return $programPrivileges;
    }


    // Returns an associative array that contains all the relevant profile 
    // information about the user according to her role; each role would
    // have different profile info
    // [in]     userData: general profile info that is common for all user 
    //          roles in the form of an associative array
    // [out]    return: an associative organizing all the relevant user info
    private function constructUserProfile($userData)
    {
        // first, store the general user data in the session variable
        $_SESSION = $userData;

        // then, compute the user's profile data structure depending on the 
        // user's role
        switch ($userData['role_name']) {
            case 'Director':
                // attempt to connect to the data base
                $logs = new db\LogsDAO();

                // get all the modules and assign them read privileges
                $privileges = $logs->selectAllWithReadPrivilege();
                $privileges = $this->getPrivilegesArray($privileges);

                // store the privileges in the session variable
                $_SESSION['privileges'] = $privileges;

                // return the final user profile data structure
                return [
                    'role' => $userData['role_name'],
                    'employee_num' => $userData['employee_num'],
                    'first_name' => $userData['first_name'],
                    'last_name' => $userData['last_name'],
                    'email' => $userData['email'],
                    'login_name' => $userData['login_name'],
                    'exclusive_access' => 
                        strtolower($userData['role_name']).'/',
                    'privileges' => $privileges
                ];
            break;

            case 'Supervisor':
                // attempt to connect to the data base
                $privilegesTable = new db\UsersLogsPrivilegesDAO();

                // get the modules associated with this user and assign them 
                // read privileges
                $privileges = $privilegesTable->selectByUserIDWithReadPrivilege(
                    $userData['id']
                );
                $privileges = $this->getPrivilegesArray($privileges);

                // store the privileges in the session variable
                $_SESSION['privileges'] = $privileges;

                // return the final user profile data structure
                return [
                    'role' => $userData['role_name'],
                    'zone' => $userData['zone_name'],
                    'employee_num' => $userData['employee_num'],
                    'first_name' => $userData['first_name'],
                    'last_name' => $userData['last_name'],
                    'email' => $userData['email'],
                    'login_name' => $userData['login_name'],
                    'exclusive_access' => 
                        strtolower($userData['role_name']).'/',
                    'privileges' => $privileges
                ];
            break;

            case 'Employee':
                // attempt to connect to the data base
                $privilegesTable = new db\UsersLogsPrivilegesDAO();

                // get the modules associated with this user and assign them 
                // read privileges
                $privileges = 
                    $privilegesTable->selectByUserID($userData['id']);
                $privileges = $this->getPrivilegesArray($privileges);

                // store the privileges in the session variable
                $_SESSION['privileges'] = $privileges;

                // return the final user profile data structure
                return [
                    'role' => $userData['role_name'],
                    'zone' => $userData['zone_name'],
                    'employee_num' => $userData['employee_num'],
                    'first_name' => $userData['first_name'],
                    'last_name' => $userData['last_name'],
                    'email' => $userData['email'],
                    'login_name' => $userData['login_name'],
                    'exclusive_access' => 
                        strtolower($userData['role_name']).'/',
                    'privileges' => $privileges
                ];
            break;

            // for the admin, we don't need the zone
            case 'Administrator':
                return [
                    'role' => $userData['role_name'],
                    'employee_num' => $userData['employee_num'],
                    'first_name' => $userData['first_name'],
                    'last_name' => $userData['last_name'],
                    'email' => $userData['email'],
                    'login_name' => $userData['login_name'],
                    'exclusive_access' => 
                        strtolower($userData['role_name']).'/',
                ];
            break;

            // for any case, simply return the basic account info
            default:
                return [
                    'role' => $userData['role_name'],
                    'employee_num' => $userData['employee_num'],
                    'first_name' => $userData['first_name'],
                    'last_name' => $userData['last_name'],
                    'email' => $userData['email'],
                    'login_name' => $userData['login_name']
                ];
            break;
        }
    }


    // Starts a new session for the user with the provided username and password
    // combination
    function start($username, $password)
    {
        // if there is a session already opened, close it before openning the 
        // new one
        if ($this->isOpen()) {
            $this->close();
        }

        // attempt to connect to the data base to retrieve the user information
        $users = new db\UsersDAO();
        $userData = $users->getByIdentifier($username);

        // check if the query was successful
        if (isset($userData)) {
            // check if the password is correct
            $isPasswordValid = password_verify(
                $password, 
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
            $clientProfile = $this->constructUserProfile($userData);
            return $clientProfile;
        } else {
            throw new \Exception('Log in credentials are incorrect.');
        }
    }


    // Returns true if a session is already open or false otherwise
    function isOpen()
    {
        return isset($_SESSION['id']);
    }


    // Closes the existing session 
    function close()
    {
        session_unset();
        session_destroy();
    }


    // Returns the value of the given key if it is stored in the
    // session storage or NULL if this does not exists
    function get($key)
    {
        return (isset($_SESSION[$key])) ? $_SESSION[$key] : NULL;
    }


    // Sets a new value to the session storage to the variable with the
    // provided key
    function set($key, $value)
    {
        $_SESSION[$key] = $value;
    }
}

?>
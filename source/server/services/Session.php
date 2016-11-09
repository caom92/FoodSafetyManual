<?php

// The namespace of the services of the project
namespace fsm\services;

// Import the site configuration file
require_once realpath(dirname(__FILE__).'/../config/site_config.php');

// Import the required DAOs
require_once realpath(dirname(__FILE__).'/../dao/UsersDAO.php');

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
        $privileges = new db\UsersZonesModulesPrivilegesDAO();
        $userData = $users->getByIdentifier($username);

        // check if the query was successful
        if (count($userData) > 0) {
            // check if the password is correct
            $isPasswordValid = password_verify(
                $password, 
                $userData['login_password']
            );

            // if it is not, notify the user
            if (!$isPasswordValid) {
                throw new \Exception('Password is incorrect.');
            } 

            // store the user data in the session variable
            $_SESSION = $userData;

            // now, retrieve the user privileges
            $userPrivileges = 
                $privileges->selectByUserID($userData['id']);
            
            // and organize it in a useful format

            // initialize the final array where the priviliges are going to be
            // stored
            $programPrivileges = [];
            
            // initialize the temporal program holder
            $program = [
                'program_name' => '',
                'modules' => []
            ];

            // initialize the temporal module holder
            $module = [
                'module_name' => '',
                'privileges' => []
            ];

            // visit each row from the data base query result
            foreach ($userPrivileges as $row) {
                // check if this row has a different program than the last
                $hasProgramChanged = 
                    $row['program_name'] != $program['program_name'];
                if ($hasProgramChanged) {
                    // if it has, assert that the last row info is not empty
                    if (strlen($program['program_name']) > 0) {
                        // if it is not, store the info in the final structure
                        array_push($program['modules'], $module);
                        array_push($programPrivileges, $program);
                    }

                    // then fill the temporal holder with the information of 
                    // this new program
                    $module = [
                        'module_name' => $row['module_name'], 
                        'privileges' => [[
                            'zone_name' => $row['zone_name'],
                            'privilege' => $row['privilege']
                        ]]
                    ];
                    $program = [
                        'program_name' => $row['program_name'],
                        'modules' => []
                    ];
                } else {
                    // if the row has the same program than the last,
                    // check if it has a different module
                    $hasModuleChanged = 
                        $row['module_name'] != $module['module_name'];
                    if ($hasModuleChanged) {
                        // if it has, store the info in the temporal program
                        // holder
                        array_push($program['modules'], $module);

                        // and then fill the temporal holder with the
                        // information of this new module
                        $module = [
                            'module_name' => $row['module_name'], 
                            'privileges' => [[
                                'zone_name' => $row['zone_name'],
                                'privilege' => $row['privilege']
                            ]]
                        ];
                    } else {
                        // if the row has the same module than the last,
                        // that means that it must have a different zone,
                        // so we store the info of this new zone into the
                        // temporal module holder
                        array_push($module['privileges'], [
                            'zone_name' => $row['zone_name'],
                            'privilege' => $row['privilege']
                        ]);
                    }   // if (hasModuleChanged)
                }   // if (hasProgramChanged)
            }   // for (userPrivileges as row)

            // don't forget to add the last entry to the final structure
            if (strlen($module['module_name']) > 0) {
                array_push($program['modules'], $module);
            }
            if (strlen($program['program_name']) > 0) {
                array_push($programPrivileges, $program);
            }

            // return the relevant info
            return [
                'role' => $userData['role_name'],
                'exclusive_access' => strtolower($userData['role_name']).'/',
                'employee_num' => $userData['employee_num'],
                'first_name' => $userData['first_name'],
                'last_name' => $userData['last_name'],
                'email' => $userData['email'],
                'login_name' => $userData['login_name'],
                'privileges' => $programPrivileges,
                'recieve_email_notifications' => 
                    $userData['recieve_email_notifications']
            ];
        } else {
            // if the query failed, it may be because the given username and 
            // password combination does not exist in the data base
            return NULL;
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